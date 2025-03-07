import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/auth";


export const useFetchRecipient = (chat, user) => {
    const recipientId = chat.senderId == user._id ? chat.receiverId : chat.senderId;

    const { data: recipient, isLoading, isError, error } = useQuery({
        queryKey: ['recipient', recipientId],
        queryFn: () => getUser(recipientId),
        enabled: !!recipientId
    });

    return { recipient, isLoading }
}