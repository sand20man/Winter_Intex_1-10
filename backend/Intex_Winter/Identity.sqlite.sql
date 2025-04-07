BEGIN TRANSACTION;
DROP TABLE IF EXISTS "AspNetRoleClaims";
CREATE TABLE "AspNetRoleClaims" (
	"Id"	INTEGER NOT NULL,
	"RoleId"	TEXT NOT NULL,
	"ClaimType"	TEXT,
	"ClaimValue"	TEXT,
	CONSTRAINT "PK_AspNetRoleClaims" PRIMARY KEY("Id" AUTOINCREMENT),
	CONSTRAINT "FK_AspNetRoleClaims_AspNetRoles_RoleId" FOREIGN KEY("RoleId") REFERENCES "AspNetRoles"("Id") ON DELETE CASCADE
);
DROP TABLE IF EXISTS "AspNetRoles";
CREATE TABLE "AspNetRoles" (
	"Id"	TEXT NOT NULL,
	"Name"	TEXT,
	"NormalizedName"	TEXT,
	"ConcurrencyStamp"	TEXT,
	CONSTRAINT "PK_AspNetRoles" PRIMARY KEY("Id")
);
DROP TABLE IF EXISTS "AspNetUserClaims";
CREATE TABLE "AspNetUserClaims" (
	"Id"	INTEGER NOT NULL,
	"UserId"	TEXT NOT NULL,
	"ClaimType"	TEXT,
	"ClaimValue"	TEXT,
	CONSTRAINT "PK_AspNetUserClaims" PRIMARY KEY("Id" AUTOINCREMENT),
	CONSTRAINT "FK_AspNetUserClaims_AspNetUsers_UserId" FOREIGN KEY("UserId") REFERENCES "AspNetUsers"("Id") ON DELETE CASCADE
);
DROP TABLE IF EXISTS "AspNetUserLogins";
CREATE TABLE "AspNetUserLogins" (
	"LoginProvider"	TEXT NOT NULL,
	"ProviderKey"	TEXT NOT NULL,
	"ProviderDisplayName"	TEXT,
	"UserId"	TEXT NOT NULL,
	CONSTRAINT "PK_AspNetUserLogins" PRIMARY KEY("LoginProvider","ProviderKey"),
	CONSTRAINT "FK_AspNetUserLogins_AspNetUsers_UserId" FOREIGN KEY("UserId") REFERENCES "AspNetUsers"("Id") ON DELETE CASCADE
);
DROP TABLE IF EXISTS "AspNetUserRoles";
CREATE TABLE "AspNetUserRoles" (
	"UserId"	TEXT NOT NULL,
	"RoleId"	TEXT NOT NULL,
	CONSTRAINT "PK_AspNetUserRoles" PRIMARY KEY("UserId","RoleId"),
	CONSTRAINT "FK_AspNetUserRoles_AspNetRoles_RoleId" FOREIGN KEY("RoleId") REFERENCES "AspNetRoles"("Id") ON DELETE CASCADE,
	CONSTRAINT "FK_AspNetUserRoles_AspNetUsers_UserId" FOREIGN KEY("UserId") REFERENCES "AspNetUsers"("Id") ON DELETE CASCADE
);
DROP TABLE IF EXISTS "AspNetUserTokens";
CREATE TABLE "AspNetUserTokens" (
	"UserId"	TEXT NOT NULL,
	"LoginProvider"	TEXT NOT NULL,
	"Name"	TEXT NOT NULL,
	"Value"	TEXT,
	CONSTRAINT "PK_AspNetUserTokens" PRIMARY KEY("UserId","LoginProvider","Name"),
	CONSTRAINT "FK_AspNetUserTokens_AspNetUsers_UserId" FOREIGN KEY("UserId") REFERENCES "AspNetUsers"("Id") ON DELETE CASCADE
);
DROP TABLE IF EXISTS "AspNetUsers";
CREATE TABLE "AspNetUsers" (
	"Id"	TEXT NOT NULL,
	"UserName"	TEXT,
	"NormalizedUserName"	TEXT,
	"Email"	TEXT,
	"NormalizedEmail"	TEXT,
	"EmailConfirmed"	INTEGER NOT NULL,
	"PasswordHash"	TEXT,
	"SecurityStamp"	TEXT,
	"ConcurrencyStamp"	TEXT,
	"PhoneNumber"	TEXT,
	"PhoneNumberConfirmed"	INTEGER NOT NULL,
	"TwoFactorEnabled"	INTEGER NOT NULL,
	"LockoutEnd"	TEXT,
	"LockoutEnabled"	INTEGER NOT NULL,
	"AccessFailedCount"	INTEGER NOT NULL,
	CONSTRAINT "PK_AspNetUsers" PRIMARY KEY("Id")
);
DROP TABLE IF EXISTS "__EFMigrationsHistory";
CREATE TABLE "__EFMigrationsHistory" (
	"MigrationId"	TEXT NOT NULL,
	"ProductVersion"	TEXT NOT NULL,
	CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY("MigrationId")
);
INSERT INTO "AspNetUsers" ("Id","UserName","NormalizedUserName","Email","NormalizedEmail","EmailConfirmed","PasswordHash","SecurityStamp","ConcurrencyStamp","PhoneNumber","PhoneNumberConfirmed","TwoFactorEnabled","LockoutEnd","LockoutEnabled","AccessFailedCount") VALUES ('6c8629c5-b8f3-4e97-bc8b-a6b2860f7c8c','group1-10@gmail.com','GROUP1-10@GMAIL.COM','group1-10@gmail.com','GROUP1-10@GMAIL.COM',0,'AQAAAAIAAYagAAAAEIWOLoFJV0pqmjh57MgtmxyS+PEJf2wjR3b08qyQr22NxZ+UIizIXARbT4Xs7frL0g==','7CM7BF7CZQO6KONHELUJ5223QHPZ6VSF','c4dbda44-8e5b-47c6-80f5-52e6ee3b2a5d',NULL,0,0,NULL,1,0);
INSERT INTO "__EFMigrationsHistory" ("MigrationId","ProductVersion") VALUES ('20250407152508_InitialCreate','8.0.13');
DROP INDEX IF EXISTS "EmailIndex";
CREATE INDEX "EmailIndex" ON "AspNetUsers" (
	"NormalizedEmail"
);
DROP INDEX IF EXISTS "IX_AspNetRoleClaims_RoleId";
CREATE INDEX "IX_AspNetRoleClaims_RoleId" ON "AspNetRoleClaims" (
	"RoleId"
);
DROP INDEX IF EXISTS "IX_AspNetUserClaims_UserId";
CREATE INDEX "IX_AspNetUserClaims_UserId" ON "AspNetUserClaims" (
	"UserId"
);
DROP INDEX IF EXISTS "IX_AspNetUserLogins_UserId";
CREATE INDEX "IX_AspNetUserLogins_UserId" ON "AspNetUserLogins" (
	"UserId"
);
DROP INDEX IF EXISTS "IX_AspNetUserRoles_RoleId";
CREATE INDEX "IX_AspNetUserRoles_RoleId" ON "AspNetUserRoles" (
	"RoleId"
);
DROP INDEX IF EXISTS "RoleNameIndex";
CREATE UNIQUE INDEX "RoleNameIndex" ON "AspNetRoles" (
	"NormalizedName"
);
DROP INDEX IF EXISTS "UserNameIndex";
CREATE UNIQUE INDEX "UserNameIndex" ON "AspNetUsers" (
	"NormalizedUserName"
);
COMMIT;
