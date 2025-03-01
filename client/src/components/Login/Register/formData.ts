import { z } from "zod";

export const schema = z.object({
  username: z.string().refine((value) => /^[A-Z]/.test(value), {
    message: "Username must start with a capital letter",
  }),
  password: z
    .string()
    .min(5, "Password has to be at least 5 characters")
    .regex(
      /[A-Z]/,
      "Password must contain at least one capital letter, one andlowcase letter and numbers"
    )
    .regex(
      /[a-z]/,
      "Password must contain at least one capital letter, one andlowcase letter and numbers"
    )
    .regex(
      /[0-9]/,
      "Password must contain at least one capital letter, one andlowcase letter and numbers"
    ),
  email: z.string().email("Please enter a valid email address"),
  profileImage: z.instanceof(FileList),
  // phoneNumber: z
  //   .string()
  //   .length(10, "Please enter a valid phone number")
  //   .startsWith("05", "Please enter a valid phone number"),
  // address: z.string(),
});

export type formData = z.infer<typeof schema>;
