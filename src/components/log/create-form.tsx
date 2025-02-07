// import type React from 'react'
// import { useState } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// interface DataEntry {
//   date: string
//   value: number
// }

// interface CreateDataFormProps {
//   onDataCreated: (newData: DataEntry[]) => void
// }

// export function CreateDataForm({ onDataCreated }: CreateDataFormProps) {
//   const [manualEntries, setManualEntries] = useState<DataEntry[]>([
//     { date: '', value: 0 },
//   ])

//   const handleManualInputChange = (
//     index: number,
//     field: 'date' | 'value',
//     value: string
//   ) => {
//     const updatedEntries = [...manualEntries]
//     if (field === 'date') {
//       updatedEntries[index].date = value
//     } else {
//       updatedEntries[index].value = Number.parseFloat(value) || 0
//     }
//     setManualEntries(updatedEntries)
//   }

//   const addManualEntry = () => {
//     setManualEntries([...manualEntries, { date: '', value: 0 }])
//   }

//   const handleManualSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     onDataCreated(manualEntries.filter((entry) => entry.date && entry.value))
//     setManualEntries([{ date: '', value: 0 }])
//   }

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onload = (event) => {
//         const csv = event.target?.result as string
//         const lines = csv.split('\n')
//         const newData: DataEntry[] = lines
//           .slice(1)
//           .map((line) => {
//             const [date, value] = line.split(',')
//             return { date: date.trim(), value: Number.parseFloat(value.trim()) }
//           })
//           .filter((entry) => entry.date && !isNaN(entry.value))
//         onDataCreated(newData)
//       }
//       reader.readAsText(file)
//     }
//   }

//   return (
//     <Card className="mt-6">
//       <CardHeader>
//         <CardTitle>Create New Data</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Tabs defaultValue="manual">
//           <TabsList>
//             <TabsTrigger value="manual">Manual Input</TabsTrigger>
//             <TabsTrigger value="upload">Upload CSV</TabsTrigger>
//           </TabsList>
//           <TabsContent value="manual">
//             <form onSubmit={handleManualSubmit} className="space-y-4">
//               {manualEntries.map((entry, index) => (
//                 <div key={index} className="flex space-x-2">
//                   <Input
//                     type="date"
//                     value={entry.date}
//                     onChange={(e) =>
//                       handleManualInputChange(index, 'date', e.target.value)
//                     }
//                     required
//                   />
//                   <Input
//                     type="number"
//                     value={entry.value}
//                     onChange={(e) =>
//                       handleManualInputChange(index, 'value', e.target.value)
//                     }
//                     required
//                   />
//                 </div>
//               ))}
//               <div className="flex space-x-2">
//                 <Button
//                   type="button"
//                   variant="secondary"
//                   onClick={addManualEntry}
//                 >
//                   Add Entry
//                 </Button>
//                 <Button type="submit">Submit</Button>
//               </div>
//             </form>
//           </TabsContent>
//           <TabsContent value="upload">
//             <Input type="file" accept=".csv" onChange={handleFileUpload} />
//           </TabsContent>
//         </Tabs>
//       </CardContent>
//     </Card>
//   )
// }
