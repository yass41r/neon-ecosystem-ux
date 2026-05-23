import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import Layout from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import Tasks from "@/pages/Tasks";
import Notes from "@/pages/Notes";
import AIAssistant from "@/pages/AIAssistant";
import Finance from "@/pages/Finance";
import Analytics from "@/pages/Analytics";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/ai" element={<AIAssistant />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Layout>
      <Toaster position="top-right" theme="dark" />
    </Router>
  );
}

export default App;