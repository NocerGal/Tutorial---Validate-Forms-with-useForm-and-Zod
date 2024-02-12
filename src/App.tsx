import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';

type FormSchema = {
  firstName: string;
  lastName: string;
  age: number;
  profession: string;
};

export default function App() {
  const zodFormSchema: ZodType<FormSchema> = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    age: z.number().min(1).max(150),
    profession: z.string().refine((profession) => profession !== '', {
      message: 'Choisissez une profession',
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(zodFormSchema),
  });

  const handleSubmitForm = async (data: FormSchema) => {
    // To simulate an API call, for example.
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log(data);
        resolve(undefined);
      }, 3000);
    });
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <fieldset disabled={isSubmitting}>
        <div>
          <label htmlFor="firstName">Prénom</label>
          <input type="text" id="firstName" {...register('firstName')} />
          {errors.firstName && <span>{errors.firstName.message}</span>}
        </div>
        <div>
          <label htmlFor="lastName">Nom</label>
          <input type="text" id="lastName" {...register('lastName')} />
          {errors.lastName && <span>{errors.lastName.message}</span>}
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            min="0"
            max="150"
            {...register('age', { valueAsNumber: true })}
          />
          {errors.age && <span>{errors.age.message}</span>}
        </div>
        <div>
          <label htmlFor="profession">Profession</label>
          <select id="profession" {...register('profession')}>
            <option disabled selected value="">
              Choisissez une profession...
            </option>
            <option value="baker">Boulanger</option>
            <option value="engineer">Ingénieur</option>
            <option value="draftsman">Dessinateur</option>
          </select>
          {errors.profession && <span>{errors.profession.message}</span>}
        </div>
        <button type="submit">
          {isSubmitting ? (
            <Loader2 className="animate-spin m-auto" />
          ) : (
            'Envoyer'
          )}
        </button>
      </fieldset>
    </form>
  );
}
