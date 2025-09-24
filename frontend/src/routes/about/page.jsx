export const AboutPage = () => {
  return (
    <section className="cs-section">
      <div className="cs-container max-w-4xl">
        <h1 className="font-bold text-3xl text-center mb-8">About TodoApp</h1>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground mb-6">
            TodoApp is a comprehensive task management solution designed to help you stay organized 
            and productive. Built with modern web technologies, it offers a seamless experience 
            across all your devices.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Create and manage tasks with detailed descriptions</li>
            <li>Organize tasks with custom tags and categories</li>
            <li>Track progress with status updates</li>
            <li>Set priorities for better task management</li>
            <li>Secure user authentication and data protection</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Frontend</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>React with TypeScript</li>
                <li>TailwindCSS for styling</li>
                <li>React Router for navigation</li>
                <li>React Query for data fetching</li>
                <li>Zustand for state management</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Backend</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Flask (Python)</li>
                <li>SQLAlchemy ORM</li>
                <li>SQLite Database</li>
                <li>JWT Authentication</li>
                <li>RESTful API</li>
              </ul>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <p className="text-muted-foreground">
            To get started with TodoApp, simply create an account and begin adding your tasks. 
            You can organize them with tags, set priorities, and track your progress as you 
            complete them.
          </p>
        </div>
      </div>
    </section>
  );
};