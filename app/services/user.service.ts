import prisma from "@/lib/prisma";
import { isRoleName } from "@/lib/roles";
import { UserListDto } from "../DTOs/users/user-list.dto";
import bcrypt from "bcryptjs";
import { CreateUserDto } from "../DTOs/users/create-user.dto";
import { UpdateUserDto } from "../DTOs/users/update-user.dto";

export async function getUsers(): Promise<UserListDto[]> {
  const users = await prisma.user.findMany({
    orderBy: {
      id: "desc",
    },
    include: {
      userRoles: {
        include: {
          role: true,
        },
      },
    },
  });

  return users.map((user) => ({
    id: user.id,
    username: user.username,
    roles: user.userRoles
      .map((userRole) => userRole.role.name)
      .filter(isRoleName),
    createdAt: user.createdAt,
  }));
}

export async function createUser(data: CreateUserDto) {
  const existingUser = await prisma.user.findUnique({
    where: {
      username: data.username,
    },
  });

  if (existingUser) {
    throw new Error("این نام کاربری قبلاً وجود دارد");
  }

  const role = await prisma.role.findUnique({
    where: {
      name: data.role,
    },
  });

  if (!role) {
    throw new Error("Role پیدا نشد");
  }

  const passwordHash = await bcrypt.hash(data.password, 12);

  const user = await prisma.user.create({
    data: {
      username: data.username,
      passwordHash,

      userRoles: {
        create: {
          roleId: role.id,
        },
      },
    },

    include: {
      userRoles: {
        include: {
          role: true,
        },
      },
    },
  });

  return user;
}

export async function deleteUser(id: number) {
  return prisma.user.delete({
    where: {
      id,
    },
  });
}

export async function updateUser(data: UpdateUserDto) {
  const user = await prisma.user.findUnique({
    where: { id: data.id },
  });

  if (!user) {
    throw new Error("کاربر پیدا نشد");
  }

  const role = await prisma.role.findUnique({
    where: { name: data.role },
  });

  if (!role) {
    throw new Error("Role پیدا نشد");
  }

  const passwordHash = data.password
    ? await bcrypt.hash(data.password, 12)
    : undefined;

  return prisma.$transaction(async (tx) => {
    const updatedUser = await tx.user.update({
      where: { id: data.id },
      data: {
        username: data.username,
        ...(passwordHash && {
          passwordHash,
        }),
      },
    });

    await tx.userRole.deleteMany({
      where: {
        userId: data.id,
      },
    });

    await tx.userRole.create({
      data: {
        userId: data.id,
        roleId: role.id,
      },
    });

    return updatedUser;
  });
}

export async function getUserById(id: number): Promise<UserListDto | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      userRoles: {
        include: {
          role: true,
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    roles: user.userRoles
      .map((userRole) => userRole.role.name)
      .filter(isRoleName),
    createdAt: user.createdAt,
  };
}
