import { useDispatch } from "react-redux";
import { addBooking } from "../../redux/bookings/slice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import css from "./BookingForm.module.css";

export default function BookingForm({ cardId }) {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    date: Yup.date().required("Date is required"),
    comment: Yup.string(),
  });

  const initialValues = {
    name: "",
    email: "",
    date: "",
    comment: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addBooking({ cardId, ...values }));

    iziToast.success({
      title: "OK",
      message: "Booking saved!",
      position: "topRight",
    });

    resetForm();
  };

  return (
    <div className={css.formWrap}>
      <h3 className={css.title}>Book your car now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={css.form}>
            <Field
              type="text"
              name="name"
              placeholder="Name*"
              className={css.input}
            />
            <ErrorMessage name="name" component="div" className={css.error} />

            <Field
              type="email"
              name="email"
              placeholder="Email*"
              className={css.input}
            />
            <ErrorMessage name="email" component="div" className={css.error} />

            <Field
              type="date"
              name="date"
              className={`${css.input} ${css.dateInput}`}
            />
            <ErrorMessage name="date" component="div" className={css.error} />

            <Field
              type="textarea"
              name="comment"
              placeholder="Comment"
              className={css.textArea}
            />

            <button type="submit" className={css.btn}>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
