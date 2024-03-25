import { z } from 'zod';

export const createRoleSchema = z.object({
  body: z.object({
    description: z
      .string({ required_error: 'You should insert a valid description!' })
      .max(100, { message: 'A role description can\'t have more than 100 characters!' })
  })
});

export const updateRoleSchema = z.object({
  params: z.object({
    id: z
      .coerce
      .number({ required_error: 'You should insert a valid id!' })
      .min(1, { message: 'You should insert an id greater than 0' })
  }),
  body: z.object({
    description: z
      .string({ required_error: 'You should insert a valid description!' })
      .max(100, { message: 'A role description can\'t have more than 100 characters!' })
  })
});

export const getOrDeleteRoleSchema = z.object({
  params: z.object({
    id: z
      .coerce
      .number({ required_error: 'You should insert a valid id!' })
      .min(1, { message: 'You should insert a id greater than 0' })
  })
});



