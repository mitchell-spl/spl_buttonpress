import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../input/input";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useState } from "react";

interface TFormValues {
  user: string;
}

export default function CurlForm({ qnumber }: { qnumber: number }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<TFormValues>();

  const [loading, setloading] = useState(false);

  const onSubmit: SubmitHandler<TFormValues> = async (data) => {
    console.log(data, "data");
    setloading(true);

    try {
      const response = await axios.post("/api/curlRequest", {
        user: data.user,
      });

      console.log(response.data, "response");
      setloading(false);
      // reset();
      toast("Request Submitted Successfully", {
        icon: "👏",
        style: {
          background: "#50c878",
          borderRadius: "20px",
          color: "#fff",
        },
      });
    } catch (error: any) {
      console.log(error?.response?.data?.message, "error");
      toast.error(error?.message);
    }
  };

  return (
    <div className="w-[100%] px-3 py-2">
      <Toaster />
      {/* <h2 className="text-center text-[20px] text-[#272727] font-[600] mb-5">
        Q{qnumber}
      </h2> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <Input
            inputType="text"
            label="User Name"
            required={true}
            register={register}
            name="user"
            errors={errors}
            rules={{ required: "User Name Is Required" }}
          />
          {/* <Input
            inputType="text"
            label="Question"
            required={true}
            register={register}
            name="question"
            errors={errors}
            rules={{ required: "Question Is Required" }}
          />
          <Input
            inputType="text"
            label="Answer"
            required={true}
            register={register}
            name="answer"
            errors={errors}
            rules={{ required: "Answer Is Required" }}
          /> */}
          <button
            disabled={loading}
            className="w-[100%] rounded-md text-white h-[48px] text-[18px] bg-red-400 flex items-center justify-center cursor-pointer hover:opacity-80 transition-all duration-150 ease-in-out"
          >
            {loading ? <div className="loader" /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
