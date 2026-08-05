export type ResourceType = 'documentacion' | 'video'

export interface Resource {
  title: string
  url: string
  type: ResourceType
}

export type CodeLanguage = 'html' | 'css' | 'javascript' | 'jsx' | 'bash'

export interface KeyIdea {
  title: string
  description: string
}

export interface CodeBlock {
  id: string
  language: CodeLanguage
  blockTitle: string
  code: string
  summary: string
  keyIdeas: KeyIdea[]
  videoTimestamp: string
  resources: Resource[]
  personalNotes: string
}

export interface Subtopic {
  id: string
  subtopicTitle: string
  videoUrl: string
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
