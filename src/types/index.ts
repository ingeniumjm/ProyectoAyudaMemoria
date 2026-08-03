export type ResourceType = 'documentacion' | 'video'

export interface Resource {
  title: string
  url: string
  type: ResourceType
}

export type CodeLanguage = 'html' | 'css' | 'javascript' | 'jsx' | 'bash'

export interface CodeBlock {
  id: string
  blockTitle: string
  code: string
  summary: string
  keyIdeas: string[]
  videoTimestamp: string
  videoUrl: string
  resources: Resource[]
  personalNotes: string
}

export interface Subtopic {
  id: string
  language: CodeLanguage
  subtopicTitle: string
  codeBlocks: CodeBlock[]
}

export interface CourseClass {
  id: string
  weekNumber: number
  certificate: string
  topicTitle: string
  totalCodeDownloadUrl: string
  subtopics: Subtopic[]
}

export interface CourseData {
  classes: CourseClass[]
}

export type UserRole = 'admin' | 'teacher' | 'student'

export interface User {
  id: string
  username: string
  email: string
  password: string
  role: UserRole
  fullName: string
  avatarUrl: string | null
  createdAt: string
}
