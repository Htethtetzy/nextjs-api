import { NextResponse } from "next/server";
import * as yup from "yup";
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  author: yup.string().required("Author is required"),
  published_year: yup.string().required("Published Year is required"),
});
export async function PUT(req, { params }) {
  try{
  const bookId = params.id;
  const body = await req.json();
  await schema.validate(body, { abortEarly: false });
  return NextResponse.json({
    message: "Book is successfully updated.",
    bookId,
    bodyData: body,
  });
}catch(error){
  if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: error.inner.map((e) => ({
            path: e.path,
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        message: "Unexpected error",
        error: error.message,
      },
      { status: 500 }
    );
}
}
export async function DELETE(req, { params }) {
  const bookId = params.id;
  return NextResponse.json({
    message: "Book is successfully deleted.",
    bookId,
  });
}

export async function GET(req, { params }) {
  const bookId = params.id;
  const book = {
    id: bookId,
     title: "The Great",
    author: "Scott",
    published_year: "1925",
  };
  return NextResponse.json(book);
}

