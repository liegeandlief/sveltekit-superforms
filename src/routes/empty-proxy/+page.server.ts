import { message, superValidate } from '$lib/server';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z.object({
  string: z.string().min(2).nullable(),
  num: z.number().min(1).nullable().default(NaN),
  string2: z.string().min(2).optional()
});

export const load = async () => {
  const form = await superValidate({ string: 'A', string2: 'B' }, schema);
  return { form };
};

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, schema);
    console.log('POST', form);

    if (!form.valid) return fail(400, { form });

    return message(form, 'Posted OK!');
  }
};
