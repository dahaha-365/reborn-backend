-- CreateTable
CREATE TABLE "AdminUser" (
    "id" BIGSERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "displayName" TEXT,
    "password" TEXT NOT NULL,
    "isSuperAdmin" BOOLEAN NOT NULL DEFAULT false,
    "canLogin" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUserLoginLog" (
    "id" BIGSERIAL NOT NULL,
    "adminUserId" BIGINT NOT NULL,
    "ip" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUserLoginLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUserRole" (
    "id" BIGSERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "AdminUserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUserRoleRel" (
    "userId" BIGINT NOT NULL,
    "roleId" BIGINT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT,

    CONSTRAINT "AdminUserRoleRel_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_username_key" ON "AdminUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUserRole_slug_key" ON "AdminUserRole"("slug");

-- AddForeignKey
ALTER TABLE "AdminUserLoginLog" ADD CONSTRAINT "AdminUserLoginLog_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "AdminUser"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminUserRoleRel" ADD CONSTRAINT "AdminUserRoleRel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AdminUser"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminUserRoleRel" ADD CONSTRAINT "AdminUserRoleRel_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "AdminUserRole"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
