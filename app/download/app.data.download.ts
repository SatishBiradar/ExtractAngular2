export interface IDownloadData {
    SessionId: string;
    Message: string;
    TransactionId: string;
    Success: string;
    price: number;
    Files:IFile[];
};
export interface IFile{
    Name: string;
    Data: string;
};
