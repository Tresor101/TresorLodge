# Contributing to TresorLodge

Thank you for your interest in contributing to TresorLodge! This document provides guidelines and instructions for contributing to our luxury hotel website project.

## 🚀 Getting Started

### Prerequisites
- Git installed on your local machine
- A modern web browser for testing
- Basic knowledge of HTML, CSS, and JavaScript

### Development Setup

1. **Fork the repository**
   - Click the "Fork" button on the GitHub repository page
   - Clone your fork locally:
     ```bash
     git clone https://github.com/YOUR_USERNAME/TresorLodge.git
     cd TresorLodge
     ```

2. **Set up local development**
   ```bash
   # Start a local server
   python -m http.server 8000
   # Or use any other local server method
   ```

3. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 How to Contribute

### Types of Contributions Welcome

- 🐛 **Bug fixes**
- ✨ **New features**
- 📱 **Responsive design improvements**
- 🎨 **UI/UX enhancements**
- 📖 **Documentation updates**
- 🚀 **Performance optimizations**
- ♿ **Accessibility improvements**

### Reporting Issues

Before creating an issue, please:
1. Check if the issue already exists
2. Provide clear reproduction steps
3. Include browser and device information
4. Add screenshots if applicable

### Making Changes

1. **Code Style Guidelines**
   - Use consistent indentation (2 spaces)
   - Write semantic HTML
   - Follow BEM methodology for CSS
   - Comment complex JavaScript functions
   - Optimize images before adding them

2. **Responsive Design Standards**
   - Test on multiple screen sizes
   - Ensure landscape/portrait compatibility
   - Use relative units (rem, em, %)
   - Implement mobile-first approach

3. **Testing Checklist**
   - [ ] Desktop (1200px+)
   - [ ] Laptop (992px-1199px)
   - [ ] Tablet (768px-991px)
   - [ ] Mobile (320px-767px)
   - [ ] Portrait orientation
   - [ ] Landscape orientation
   - [ ] Cross-browser compatibility

### Pull Request Process

1. **Before submitting**
   - Ensure your code follows our style guidelines
   - Test thoroughly across different devices
   - Update documentation if needed
   - Verify all links work correctly

2. **PR Description should include**
   - Clear description of changes
   - Screenshots/videos of UI changes
   - Testing information
   - Related issue numbers

3. **Review Process**
   - Code review by maintainers
   - Testing on multiple devices
   - Feedback incorporation
   - Final approval and merge

## 🏨 Project-Specific Guidelines

### Hotel Content Standards
- Maintain luxury branding consistency
- Ensure 3-star rating accuracy
- Keep pricing current (60$, 80$, 100$)
- Verify contact information

### Image Guidelines
- Optimize for web (WebP preferred)
- Maintain consistent quality
- Use appropriate alt text
- Keep file sizes reasonable

### Performance Standards
- Page load time < 3 seconds
- Lighthouse score > 90
- Mobile-friendly test passing
- No console errors

## 🔧 Development Workflow

```bash
# 1. Start with updated main branch
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/amazing-feature

# 3. Make your changes
# ... develop, test, improve ...

# 4. Commit with clear messages
git add .
git commit -m "Add amazing feature for room booking"

# 5. Push and create PR
git push origin feature/amazing-feature
```

## 📋 Code Review Criteria

### ✅ Acceptance Criteria
- Code follows style guidelines
- Responsive design works on all target devices
- No broken functionality
- Performance remains optimal
- Documentation updated if needed

### ❌ Common Issues to Avoid
- Fixed pixel values instead of relative units
- Missing mobile breakpoints
- Broken navigation links
- Poor contrast ratios
- Unoptimized images

## 🌟 Recognition

Contributors will be:
- Listed in our README.md contributors section
- Mentioned in release notes for significant contributions
- Invited to provide feedback on project direction

## 📞 Getting Help

- **Documentation**: Check our README.md
- **Issues**: Search existing GitHub issues
- **Contact**: Email tresorlodgerdc@gmail.com
- **Response Time**: Usually within 48 hours

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You

Every contribution, no matter how small, helps make TresorLodge better for our guests and the community. We appreciate your time and effort!

---

Happy coding! 🚀