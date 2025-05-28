import Link from "next/link";
import { Button } from "../../components/ui/Button";

export default function About() {
  return (
    <div>
      <h1>About Me</h1>
      <p>This is about page</p>
      <Button variant="outline">Outline</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button>Default</Button>
      <footer>
        <Link href="/" rel="prev">
          Back
        </Link>
      </footer>
    </div>
  );
}
