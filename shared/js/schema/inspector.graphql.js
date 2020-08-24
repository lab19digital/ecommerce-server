export default `
extend type Query {
    packages: String @field(resolver: "Gernzy\Server\GraphQL\Queries\Inspector@packages")
    logContents(filename: String): String @field(resolver: "Gernzy\Server\GraphQL\Queries\Inspector@logContents")
    filteredLogFiles(filenames: [String], keyword: String): String
        @field(resolver: "Gernzy\Server\GraphQL\Queries\Inspector@filteredLogContents")
} 
`
