import { Form } from "./form";

export interface File {
    _id?: any;
    name: string,
    path: string,
    description?: string,
    createdOn: number,
    type: 'FORM' | 'FOLDER' | 'OTHER',
    formDetails?: Form,
    formId?: string,
    document?:any
}

