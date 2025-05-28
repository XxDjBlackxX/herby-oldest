import crypto from "crypto";

export function createAvatarURL(): string {
  const randomNumber = (Math.floor(Math.random() * 4) + 1)
    .toString()
    .padStart(2, "0");
  return `${process.env.CLIENT_URL}/assets/avatars/${randomNumber}.svg`;
}

export function createBannerURL(): string {
  const randomNumber = (Math.floor(Math.random() * 4) + 1)
    .toString()
    .padStart(2, "0");
  return `${process.env.CLIENT_URL}/assets/banners/${randomNumber}.svg`;
}

export function createUsername(): string {
  return crypto.randomBytes(10).toString("hex");
}

export function createPassword(): string {
  return crypto.randomBytes(60).toString("hex");
}
