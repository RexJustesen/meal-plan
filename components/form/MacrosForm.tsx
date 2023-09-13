"use client";
import React, { useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ArcElement,
    DoughnutController
} from "chart.js";

import { Doughnut } from "react-chartjs-2";



import { Checkbox } from "@/components/ui/checkbox"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "../ui/input";
import { Button } from "../ui/button";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    DoughnutController);

const formSchema = z.object({
  goalWeight: z.string().min(2, {
    message: "Goal Weight must be in pounds.",
  }),
  keto: z.boolean().default(false).optional(),
  vegan: z.boolean().default(false).optional(),
});
/*
function onSubmit(values: z.infer<typeof formSchema>) {
    var protein;
    var carbs;
    var fats;
    if(values.keto !== true){
        protein = 0.8 * parseInt(values.goalWeight);
        carbs = 0.8 * parseInt(values.goalWeight);
        fats = 0.3 * parseInt(values.goalWeight);
        console.log(protein, carbs, fats);

    }else{
        protein = 0.8 * parseInt(values.goalWeight);
        carbs = 0.3 * parseInt(values.goalWeight);
        fats = 0.8 * parseInt(values.goalWeight);
        console.log(protein, carbs, fats);
    }
    
}
*/

const MacrosForm = () => {
    const [showGraph, setShowGraph] = useState(false);
    const [chartData, setChartData] = useState<{
    protein: number;
    carbs: number;
    fats: number;
  } | null>(null); // State to store chart data
// State to control graph visibility

  function onSubmit(values: z.infer<typeof formSchema>) {
        

        if (values.keto !== true) {
           let protein = 0.8 * parseInt(values.goalWeight);
           let carbs = 0.8 * parseInt(values.goalWeight);
           let fats = 0.3 * parseInt(values.goalWeight);
            console.log(protein, carbs, fats);

            setChartData({
                protein,
                carbs,
                fats,
            });
            setShowGraph(true); // Display the graph


            // ... rest of your chart setup code
        } else {
           let protein = 0.8 * parseInt(values.goalWeight);
           let carbs = 0.3 * parseInt(values.goalWeight);
           let fats = 0.8 * parseInt(values.goalWeight);
            console.log(protein, carbs, fats);

            setChartData({
                protein,
                carbs,
                fats,
            });
            setShowGraph(true); // Display the graph
        }
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            keto: false,
            vegan: false,
        }
    })
    return ( 
        <div>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="goalWeight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal Weight (lbs)</FormLabel>
              <FormControl>
                <Input placeholder="160" {...field} />
              </FormControl>
              <FormDescription>
                Goal Weight must be in pounds
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="keto"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Are you wanting a keto diet?
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vegan"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Are you Vegan?
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
     {showGraph && chartData !== null && (
        <div className="my-4">
          <DoughnutChart data={chartData}  />
        </div>
      )}
    </div>
  );
}

function DoughnutChart({ data }: { data: { protein: number; carbs: number; fats: number } }) {
  // Define your chart data and options here
  const chartData ={
            backgroundColor: [
                "rgb(2, 88, 255)",
                "rgb(249, 151, 0)",
                "rgb(32, 214, 152)",
            ],
            labels:["Protein", "Carbs", "Fats"],
            datasets: [
                {
                    label: "Daily Macro Nutrients",
                    data: [data.protein, data.carbs, data.fats],
                    backgroundColor: [
                        "rgb(2, 88, 255)",
                        "rgb(249, 151, 0)",
                        "rgb(32, 214, 152)",
                    ],
                    hoverOffset: 4,
                }
            ]
        };

 
        console.log(data.protein);

  return <Doughnut data={chartData} width={50} height={50}  />;
}
 
export default MacrosForm;