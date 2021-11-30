export class Form {
    _id?: any;
    name!: string;
    description?: string;
    path!: string;
    limitToSingleResponse: boolean = false;
    responseGroupId!: string;
    createdOn?: number;
    isActive?: boolean;
    activeFrom?: number;
    activeEnd?: number;
    lastModified?: number;
    template: Object[] = [

    ];
}

// export class FormField {
//     id?: string;
//     type!: string;
//     question!: string;
//     name!: string;
//     required: boolean = false;
//     values: Array<FormFieldOption> = [];
//     isScoringEnabled: boolean = false;
//     answer?: string;
//     score?: number;
// }

// export class FormFieldOption {
//     imgUrl?: string;
//     label!: string;
//     values!: string;
//     selected: boolean = false;
// }