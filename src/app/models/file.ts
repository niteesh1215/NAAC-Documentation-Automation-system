import { Form } from "./form";

export interface File {
    name: string,
    path: string,
    description?: string,
    createdOn: number,
    type: string, // 'FORM' or 'FOLDER'
    formDetails?: Form,
    formId?: string,
}