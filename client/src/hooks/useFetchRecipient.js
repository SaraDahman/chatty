import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/auth";


export const useFetchRecipient = (chat, user) => {
    const recipientId = chat.sender == user._id ? chat.receiver : chat.sender;

    const { data: recipient, isLoading, isError, error } = useQuery({
        queryKey: ['recipient', recipientId],
        queryFn: () => getUser(recipientId),
        enabled: !!recipientId
    });

    return { recipient, isLoading }
}