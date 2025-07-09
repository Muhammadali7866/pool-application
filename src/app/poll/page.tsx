'use client';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
type FormData = {
    question: string;
    options: { value: string }[];
    allowMultiple: boolean;
    showResultsBeforeVote: boolean;
    endDate?: string;
}
export default function CreatePoll() {
    const router = useRouter();
    const { register, handleSubmit, control, formState: { errors }, 
    } = useForm<FormData>({
        defaultValues: {
            question: '',
            options: [{ value: '' }, { value: '' }],
            allowMultiple: false,
            showResultsBeforeVote: false
        }
    })
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'options',
    });

    const onSubmit = async (data: FormData) => {
        const nonEmptyOptions = data.options.filter((opt) => opt.value.trim() !== '');
        console.log({ data });

        if (nonEmptyOptions.length < 2) {
            alert('Please add at least 2 options.');
            return;
        }
        const payload = {
            question: data.question,
            options: data.options.map((key) => key.value),
            settings: {
                allowMultiple: data.allowMultiple,
                showResultsBeforeVote: data.showResultsBeforeVote,
            },
            ends_at: data.endDate || null,
        };
        const { error: pollError } = await supabase
            .from('polls')
            .insert([payload])

        if (pollError) {
            console.error('Error creating poll:', pollError);
            return;
        }
        router.push('/dashboard')
    }
    return (
        <>
            <div className='bg-gray-800 h-screen  flex justify-center p-13'>
                <div className='p-10 bg-white w-[560px] h-[650px] rounded-3xl'>        
                <h2 className='mt-3 text-center text-2xl font-bold'>Create a Poll</h2>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="" className='flex-1 p-2 block text-xl '>Poll Question</label>
                    <input {...register('question', { required: 'poll question is required' })} placeholder='Pool Question'
                    className='w-full p-2 border rounded mb-2 border-black'/>
                    {errors.question && (
                        <p className="text-red-500 mb-2">{errors.question.message}</p>
                    )}

                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center mb-2">
                            <input
                                {...register(`options.${index}.value` as const, {
                                    required: true,
                                })}
                                placeholder={`Option ${index + 1}`}
                                className="flex-1 p-2 border rounded border-black"
                            />
                            {fields.length > 2 && (
                                <button
                                    type="button"
                                    className="ml-2 text-red-500"
                                    onClick={() => remove(index)}
                                >
                                    ❌
                                </button>
                            )}
                        </div>
                    ))}
                    {
                        fields.length < 10 && (
                            <button type="button" className="text-blue-500 cursor-pointer mb-4" onClick={() => append({ value: '' })}>

                                Add Option
                            </button>
                        )
                    }

                    <div>
                        <label htmlFor="">
                            <input type="checkbox" {...register('allowMultiple')}  className='mr-2' />
                            Allow multiple selections
                        </label>
                        <label className="flex items-center mt-2">
                            <input type="checkbox" {...register('showResultsBeforeVote')} className="mr-2" />
                            Show results before voting
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block mt-2">End Date (optional)</label>
                        <input type="date" {...register('endDate')} className="p-2 border rounded" />
                    </div>

                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
                        Create Poll
                    </button>

                </form>
                </div>
            </div>


        </>
    )
}
