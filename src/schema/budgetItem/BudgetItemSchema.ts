import * as Yup from "yup";

const BudgetItemSchema = Yup.object().shape({
  budget_id: Yup.number().required("This is a required field."),
category: Yup.string().required("This is a required field."),
amount: Yup.string().required("This is a required field."),
description: Yup.string().required("This is a required field."),
type: Yup.string().required("This is a required field.")
});

export default BudgetItemSchema;
