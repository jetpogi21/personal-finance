import * as Yup from "yup";

const AccountTitleSchema = Yup.object().shape({
  account_title: Yup.string().required("This is a required field."),
  normal_balance: Yup.string().required("This is a required field."),
  SubAccountTitles: Yup.array().of(
    Yup.object().shape({
      sub_account_title: Yup.string().when("touched", ([touched], schema) => {
        return touched
          ? schema.required("This is a required field.")
          : schema.notRequired();
      }),
    })
  ),
});

export default AccountTitleSchema;
