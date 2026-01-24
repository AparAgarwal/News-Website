# Contributing to News Website

Thank you for considering contributing to the News Website project! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)

## 📜 Code of Conduct

This project follows a simple code of conduct:
- Be respectful and constructive
- Welcome newcomers
- Focus on what's best for the community
- Show empathy towards others

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs **actual behavior**
- **Screenshots** if applicable
- **Environment** (browser, OS, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When suggesting:

- **Use a clear title** describing the enhancement
- **Provide a detailed description** of the suggested feature
- **Explain why** this enhancement would be useful
- **Provide examples** if applicable

### Pull Requests

1. Fork the repository from [AparAgarwal/News-Website](https://github.com/AparAgarwal/News-Website)
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes following our [coding standards](#coding-standards)
4. Test your changes thoroughly
5. Commit with clear messages (`git commit -m 'feat: add amazing feature'`)
6. Push to your fork (`git push origin feature/AmazingFeature`)
7. Open a Pull Request to the main repository

## 🛠️ Development Setup

### Prerequisites

- Git
- Modern web browser
- Text editor (VS Code recommended)
- (Optional) Node.js for local Vercel testing

### Local Development

1. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/News-Website.git
   cd News-Website
   ```

2. **Open in browser:**
   ```bash
   open index.html  # macOS
   start index.html # Windows
   ```

3. **Make changes and test locally**

### Testing Checklist

Before submitting a PR, verify:

- [ ] All pages load without errors
- [ ] No console errors in browser DevTools
- [ ] Search functionality works
- [ ] Load More button works
- [ ] Mobile responsive design intact
- [ ] All categories display correctly
- [ ] Images load or show placeholders
- [ ] Code follows style guidelines

## 📝 Coding Standards

### JavaScript

- Use ES6+ features (const, let, arrow functions)
- Use meaningful variable names
- Add comments for complex logic
- Follow existing code structure
- Use semicolons consistently

**Example:**
```javascript
// Good
const fetchArticles = async (category) => {
    // Fetch articles from API
    const response = await fetch(url);
    return response.json();
};

// Avoid
var x = function(c) {
    var r = fetch(u)
    return r.json()
}
```

### HTML

- Use semantic HTML5 elements
- Maintain proper indentation (2 or 4 spaces)
- Add alt text to images
- Use meaningful class and id names

### CSS

- Follow existing naming conventions
- Group related properties
- Use CSS variables for colors/values
- Add comments for complex selectors
- Maintain mobile-first approach

### File Organization

- JavaScript files go in `js/`
- CSS files go in `css/`
- Images go in `assets/`
- Documentation goes in `docs/`

### Security

**Always ensure:**
- No hardcoded API keys in client code
- Use `textContent` instead of `innerHTML` for user data
- Validate URLs before assigning to `href`
- Use `rel="noopener noreferrer"` for external links

## 🔄 Submitting Changes

### Commit Message Format

Use conventional commits format:

```
type(scope): subject

body (optional)
footer (optional)
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

**Examples:**
```bash
feat(search): add real-time search suggestions
fix(api): handle rate limit errors gracefully
docs(readme): update installation instructions
style(css): improve mobile responsiveness
```

### Pull Request Process

1. **Update documentation** if needed
2. **Test thoroughly** on multiple browsers
3. **Reference related issues** in PR description
4. **Wait for review** - maintainers will review your PR
5. **Address feedback** if requested
6. **Celebrate** when merged! 🎉

### What to Include in PR

- Clear description of changes
- Why the changes are needed
- How to test the changes
- Screenshots (for UI changes)
- Reference to related issues

**PR Template:**
```markdown
## Description
Brief description of changes

## Motivation
Why are these changes needed?

## Changes Made
- Change 1
- Change 2

## Testing
How to test these changes

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Tested locally
- [ ] Documentation updated
- [ ] No console errors
```

## 🎯 Good First Issues

Looking for where to start? Check issues labeled:
- `good first issue` - Great for beginners
- `help wanted` - Community help needed
- `enhancement` - New features to add

## 💡 Development Tips

### Debugging

1. Use browser DevTools Console for errors
2. Check Network tab for API requests
3. Use `console.log()` for debugging (remove before PR)
4. Test with DevTools mobile emulation

### Testing Different Scenarios

- Test with slow network (DevTools throttling)
- Test with ad blockers enabled
- Test on actual mobile devices
- Test with different screen sizes

### Common Issues

**Issue:** Changes not appearing
- Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Clear browser cache

**Issue:** API not working
- Check browser console for errors
- Verify API key is valid
- Check network requests in DevTools

## 📞 Getting Help

- **GitHub Issues:** [Report bugs or ask questions](https://github.com/AparAgarwal/News-Website/issues)
- **Pull Requests:** Use PR comments for specific questions
- **Discussions:** Use GitHub Discussions for general topics

## 🙏 Recognition

Contributors will be:
- Listed in project documentation
- Credited in release notes
- Recognized in community discussions

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing! 🚀**
