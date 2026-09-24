"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { BookType } from "@/types/books.type";

// Custom color palette matching the design (Blue, Green, Yellow, Orange, Red)
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF0000", "#8884d8", "#82ca9d"];

// SVG Path Generator for the curved triangular/pyramid bar shape
const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height}
  ${x + width}, ${y + height}
  z`;
};

// Define types for the TriangleBar props
interface TriangleBarProps {
  fill?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

// Custom Shape Component for Recharts Bar
const TriangleBar = (props: TriangleBarProps) => {
  const { fill = "#000", x = 0, y = 0, width = 0, height = 0 } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

// Define types for the CustomBarLabel props
interface CustomBarLabelProps {
  x?: number;
  y?: number;
  width?: number;
  value?: number | string;
  index?: number;
}

// Custom Top Label Component to match numbers and colors
const CustomBarLabel = (props: CustomBarLabelProps) => {
  const { x = 0, y = 0, width = 0, value = "", index = 0 } = props;
  return (
    <text
      x={x + width / 2}
      y={y - 12}
      fill={colors[index % colors.length]}
      textAnchor="middle"
      dominantBaseline="middle"
      className="font-bold text-sm"
    >
      {value}
    </text>
  );
};

export default function PagesToReadPage() {
  const [chartData, setChartData] = useState<{ name: string; pages: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReadBooks = async () => {
      try {
        const response = await fetch("/booksData.json");
        const allBooks: BookType[] = await response.json();

        // 1. Get read list from local storage
        const readListIds = JSON.parse(
          localStorage.getItem("read-list") || "[]"
        ).map(String);

        // 2. Filter books marked as read
        const readBooks = allBooks.filter((book) =>
          readListIds.includes(String(book.bookId))
        );

        // 3. Format data specifically for Recharts
        const formattedData = readBooks.map((book) => ({
          name: book.bookName,
          pages: book.totalPages,
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Error loading chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReadBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-[#13131308] rounded-3xl p-6 md:p-12 min-h-[550px] flex flex-col justify-center items-center">
        {chartData.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              No Read Books Yet
            </h2>
            <p className="text-gray-500">
              Go to the book details page and click <span className="font-bold">"Read"</span> to add books to this chart.
            </p>
          </div>
        ) : (
          <div className="w-full h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 40, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#13131399", fontSize: 12 }}
                  interval={0}
                />
                <YAxis tick={{ fill: "#13131399", fontSize: 12 }} />
                <Tooltip
                  formatter={(value: any) => [`${value} Pages`, "Total Pages"]}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    borderColor: "#e5e7eb",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar
                  dataKey="pages"
                  fill="#8884d8"
                  shape={<TriangleBar />}
                  label={<CustomBarLabel />}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}