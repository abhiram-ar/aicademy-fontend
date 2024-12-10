import { Button } from "@/components/ui/button"

export default function App() {
  return (
    <div>
      <Button variant="neutral" size="lg" onClick={()=>alert("hello")}>hello</Button>
    </div>
  )
}
