export interface Notification
{
    id: string;  
    type?: string;
    title?: string;
    content?: string;
    CreatedAt: string;
    seen: boolean;
}
