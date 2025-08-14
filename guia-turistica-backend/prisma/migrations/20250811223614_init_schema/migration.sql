-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'GUIDE', 'TOURIST');

-- CreateEnum
CREATE TYPE "public"."BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "public"."LanguageLevel" AS ENUM ('BASIC', 'CONVERSATIONAL', 'FLUENT', 'NATIVE');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "locale" TEXT,
    "role" "public"."UserRole" NOT NULL DEFAULT 'TOURIST',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GuideProfile" (
    "userId" TEXT NOT NULL,
    "displayName" TEXT,
    "bio" TEXT,
    "ratePerDay" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'PEN',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "ratingAvg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "cityId" INTEGER,

    CONSTRAINT "GuideProfile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."Region" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Language" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "public"."GuideLanguage" (
    "guideId" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "level" "public"."LanguageLevel" NOT NULL,

    CONSTRAINT "GuideLanguage_pkey" PRIMARY KEY ("guideId","languageCode")
);

-- CreateTable
CREATE TABLE "public"."Specialty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Specialty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GuideSpecialty" (
    "guideId" TEXT NOT NULL,
    "specialtyId" INTEGER NOT NULL,

    CONSTRAINT "GuideSpecialty_pkey" PRIMARY KEY ("guideId","specialtyId")
);

-- CreateTable
CREATE TABLE "public"."Booking" (
    "id" TEXT NOT NULL,
    "touristId" TEXT NOT NULL,
    "guideId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "pricePerDay" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'PEN',
    "status" "public"."BookingStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Review" (
    "id" SERIAL NOT NULL,
    "bookingId" TEXT,
    "touristId" TEXT NOT NULL,
    "guideId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "GuideProfile_cityId_idx" ON "public"."GuideProfile"("cityId");

-- CreateIndex
CREATE UNIQUE INDEX "Region_slug_key" ON "public"."Region"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "City_slug_key" ON "public"."City"("slug");

-- CreateIndex
CREATE INDEX "City_regionId_idx" ON "public"."City"("regionId");

-- CreateIndex
CREATE INDEX "GuideLanguage_languageCode_idx" ON "public"."GuideLanguage"("languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "Specialty_name_key" ON "public"."Specialty"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Specialty_slug_key" ON "public"."Specialty"("slug");

-- CreateIndex
CREATE INDEX "GuideSpecialty_specialtyId_idx" ON "public"."GuideSpecialty"("specialtyId");

-- CreateIndex
CREATE INDEX "Booking_touristId_idx" ON "public"."Booking"("touristId");

-- CreateIndex
CREATE INDEX "Booking_guideId_idx" ON "public"."Booking"("guideId");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "public"."Booking"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Review_bookingId_key" ON "public"."Review"("bookingId");

-- CreateIndex
CREATE INDEX "Review_guideId_idx" ON "public"."Review"("guideId");

-- CreateIndex
CREATE INDEX "Review_touristId_idx" ON "public"."Review"("touristId");

-- AddForeignKey
ALTER TABLE "public"."GuideProfile" ADD CONSTRAINT "GuideProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GuideProfile" ADD CONSTRAINT "GuideProfile_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "public"."City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."City" ADD CONSTRAINT "City_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "public"."Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GuideLanguage" ADD CONSTRAINT "GuideLanguage_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "public"."GuideProfile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GuideLanguage" ADD CONSTRAINT "GuideLanguage_languageCode_fkey" FOREIGN KEY ("languageCode") REFERENCES "public"."Language"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GuideSpecialty" ADD CONSTRAINT "GuideSpecialty_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "public"."GuideProfile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GuideSpecialty" ADD CONSTRAINT "GuideSpecialty_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "public"."Specialty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_touristId_fkey" FOREIGN KEY ("touristId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "public"."Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_touristId_fkey" FOREIGN KEY ("touristId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
