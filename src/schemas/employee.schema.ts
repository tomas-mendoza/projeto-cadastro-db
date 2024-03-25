import { z } from 'zod';

export const createEmployeeSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'You should insert a name!' })
      .min(3, { message: 'You should insert a name greater than or equal to 3 characters!' }),
    age: z
      .number({ required_error: 'You should insert a age!' })
      .int({ message: 'An age should be an integer!' })
      .min(1, { message: 'You should insert an age greater than or equal to 1!' }),
    cpf: z
      .string({ required_error: 'You should insert a CPF!' })
      .refine((value) => value.match(/^\d{3}\d{3}\d{3}\d{2}$/g), { message: 'The CPF must be valid!' }),
    role_id: z
      .number()
      .int({ message: 'A role id should be an integer!' })
      .optional() 
  })
});

export const updateEmployeeSchema = z.object({
  params: z.object({
    id: z
      .coerce
      .number({ required_error: 'You should insert a valid id!' })
      .min(1, { message: 'You should insert a id greater than 0' })   
  }),
  body: z.object({
    name: z
      .string({ required_error: 'You should insert a name!' })
      .min(3, { message: 'You should insert a name greater than or equal to 3 characters!' }),
    age: z
      .number({ required_error: 'You should insert a age!' })
      .int({ message: 'An age should be an integer!' })
      .min(1, { message: 'You should insert a age greater than or equal to 1!' }),
    cpf: z
      .string({ required_error: 'You should insert a CPF!' })
      .refine((value) => value.match(/^\d{3}\d{3}\d{3}\d{2}$/g), { message: 'The CPF must be valid!' }),
    role_id: z
      .number()
      .int({ message: 'A role id should be an integer!' })
      .optional() 
  })
});

export const getOrDeleteEmployeeSchema = z.object({
  params: z.object({
    id: z
      .coerce
      .number({ required_error: 'You should insert a valid id!' })
      .min(1, { message: 'You should insert a id greater than 0' })   
  })
});
