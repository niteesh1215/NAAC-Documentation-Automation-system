export class Form {
    _id?: string;
    formName!: string;
    description?: string;
    formFields: Object[] = [

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