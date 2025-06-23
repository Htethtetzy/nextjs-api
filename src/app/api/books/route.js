import { NextResponse } from "next/server";
import * as yup from "yup";
const BookData = [
  {
    id: 1,
    title: "The Great",
    author: "Scott",
    published_year: "1925",
  },
];
export async function GET() {
  return NextResponse.json({ BookData });
}

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  author: yup.string().required("Author is required"),
  published_year: yup.string().required("Published Year is required"),
});

export async function POST(req) {
  try{
  const body = await req.json();
  await schema.validate(body, { abortEarly: false });
  return NextResponse.json({
    message: "Book is successfully created",
    BookData: body,
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
