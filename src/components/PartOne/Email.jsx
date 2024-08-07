import { createSignal, onMount } from "solid-js";
export default function Email(props) {
    const [email, setEmail] = createSignal("")
    onMount(() => {
        const rawEmail = atob(props.base64email)
        setEmail(rawEmail)
    })
    return (
        <a
            class="mx-auto mt-16 sm:mt-24 2xl:mt-32 flex w-fit border border-[#080808] rounded-full cursor-pointer p-4 bg-[#434343]"
            href={`mailto:${email()}`}
        >
            <img src={props.mailicon} class="mr-4" />
            <p class="text-gainsboro">{email()}</p>
        </a>
    )
}