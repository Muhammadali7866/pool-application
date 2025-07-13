"use client";

import { supabase } from "@/src/lib/supabase";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
type FormData = {
  question: string;
  options: { value: string }[];
  allowMultiple: boolean;
  showResultsBeforeVote: boolean;
  endDate?: string;
};
export default function CreatePoll() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      question: "",
      options: [{ value: "" }, { value: "" }],
      allowMultiple: false,
      showResultsBeforeVote: false,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onSubmit = async (data: FormData) => {
    const nonEmptyOptions = data.options.filter(
      (opt) => opt.value.trim() !== ""
    );
    console.log({ data });

    if (nonEmptyOptions.length < 2) {
      alert("Please add at least 2 options.");
      return;
    }
    console.log({ data });

    const payload = {
      question: data.question,
      options: data.options.map((key) => key.value),
      settings: {
        allowMultiple: data.allowMultiple,
        showResultsBeforeVote: data.showResultsBeforeVote,
      },
      ends_at: data.endDate || null,
    };
    console.log({ payload });

    const { error: pollError } = await supabase.from("polls").insert([payload]);

    if (pollError) {
      console.error("Error creating poll:", pollError);
      return;
    }
    router.push("/dashboard");
  };
  return (
    <>
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-white tracking-tight text-[32px] font-bold leading-tight min-w-72">
              Create a Poll
            </p>
          </div>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="" className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">
                Poll Question
              </p>
            </label>
            <input
              {...register("question", {
                required: "poll question is required",
              })}
              placeholder="Enter Your Poll Question here"
              className="flex w-full min-w-0 flex-1 rounded-xl max-w-[480px] text-white border-none bg-[#2b3640] focus:border-none h-12 placeholder:text-[#9daebe] p-2 text-base font-normal leading-normal"
            />
            <h3 className="text-white text-base font-bold leading-normal pb-2 mt-3">
              Options
            </h3>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex max-w-[480px] flex-wrap items-end gap-4 py-2"
              >
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-white text-base font-medium leading-normal pb-2">
                    Option {`${index + 1}`}
                  </p>
                  <input
                    placeholder={`Option ${index + 1}`}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2b3640] focus:border-none h-14 placeholder:text-[#9daebe] p-4 text-base font-normal leading-normal"
                    {...register(`options.${index}.value` as const, {
                      required: true,
                    })}
                  />
                </label>

                {fields.length > 2 && (
                  <button
                    type="button"
                    className="ml-2 text-red-500 cursor-pointer pb-3"
                    onClick={() => remove(index)}
                  >
                    ❌
                  </button>
                )}
              </div>
            ))}
            {fields.length < 10 && (
              <button
                type="button"
                className="px-3 py-2 text-white bg-[#2b3640] rounded-lg mt-2 leading-tight cursor-pointer"
                onClick={() => append({ value: "" })}
              >
                Add Option
              </button>
            )}

            <h3 className="text-white text-lg font-bold leading-tight pb-2 pt-4">
              Settings
            </h3>

            <div className="flex items-center gap-4 bg-[#141a1f] min-h-14 mt-2">
              <p className="text-white text-base font-normal leading-normal flex-1 truncate">
                Allow Multiple Selections
              </p>
              <div className="shrink-0">
                <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-[#2b3640] p-0.5 has-[:checked]:justify-end has-[:checked]:bg-[#dce8f3]">
                  <div className="h-full w-[27px] rounded-full bg-white"></div>
                  <input
                    type="checkbox"
                    className="invisible absolute"
                    {...register("allowMultiple")}
                  />
                </label>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-[#141a1f]  min-h-14 justify-between mt-2">
              <p className="text-white text-base font-normal leading-normal flex-1 truncate">
                Show results before voting
              </p>
              <div className="shrink-0">
                <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-[#2b3640] p-0.5 has-[:checked]:justify-end has-[:checked]:bg-[#dce8f3]">
                  <div className="h-full w-[27px] rounded-full bg-white"></div>
                  <input
                    type="checkbox"
                    className="invisible absolute"
                    {...register("showResultsBeforeVote")}
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2 bg-[#141a1f] py-4 mt-4 rounded-lg">
              <label className="text-white text-base font-normal leading-normal">
                End Date (optional)
              </label>
              <input
                type="date"
                className="text-white bg-[#2b3640] rounded-lg p-2 outline-none border-none w-full max-w-[240px]"
                {...register("endDate")}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer mt-2"
            >
              Create Poll
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
