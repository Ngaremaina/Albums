import SubmitButton from "../buttons/SubmitButton";

type FormInputProps = {
    heading: string,
    handleSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
}


function FormTemplate({handleSubmit, heading, children}: FormInputProps){
    return(
        <section className="flex justify-center mb-10">
            <div className="w-11/12 bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0">
            <div className="p-3 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                {heading}
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    {children}
                <SubmitButton/>
                </form>
            </div>
            </div>
        </section>
    )
}

export default FormTemplate;