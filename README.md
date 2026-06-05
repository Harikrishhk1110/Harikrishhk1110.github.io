# 📁  BBW Staging Dashboard

A complete **offline-first** web application for document management and material request tracking. Works seamlessly **online and offline** using Progressive Web App (PWA) technology.

## 🎯 Features

### 📁 Document Hub
- ✅ **Upload & Manage Files** - Excel, PDF, Word documents
- ✅ **Search Functionality** - Find files instantly
- ✅ **Filter by Type** - Organize by document category
- ✅ **Local Storage** - Files stored in browser
- ✅ **Works Offline** - Access cached files without internet

### 📊 BBW Production Dashboard
- ✅ **Inventory Management** - Track CURITY inventory status
- ✅ **Packing List** - Search and manage packing items
- ✅ **Staging Area** - Monitor production staging
- ✅ **Inbound Tracking** - Track incoming materials
- ✅ **Item Search** - Quick search by item number

### 📝 Material Request Form (MTR)
- ✅ **Auto-Generated MTR Numbers** - Unique ID for each request
- ✅ **Auto-Generate Reports** - Create professional MTR reports instantly
- ✅ **Multiple Item Requests** - Add multiple items per form
- ✅ **Priority Levels** - Normal, High, Urgent
- ✅ **Export to PDF/HTML** - Download or print reports
- ✅ **Local Data Persistence** - All data saved in browser

## 📂 Project Structure

```
harikrishhk1110.github.io/
├── index.html           # Main application file
├── style.css            # Styling
├── script.js            # Core functionality
├── sw.js                # Service Worker (offline support)
├── sw-register.js       # Service Worker registration
├── manifest.json        # PWA manifest
└── README.md            # This file
```

## 🚀 Getting Started

### Quick Access
1. Go to: `https://harikrishhk1110.github.io`
2. App is ready to use immediately
3. Works offline after first load

## 📖 How to Use

### Adding Files
1. Go to **Document Hub** tab
2. Click **Upload New Document**
3. Select files from your computer
4. Files are stored locally in your browser

### Creating Material Requests
1. Go to **MTR Form** tab
2. Fill in:
   - Item Number (e.g., CURITY-001)
   - Item Description
   - Quantity
   - Priority Level
3. Click **Add to Request**
4. Add multiple items if needed
5. Click **Generate MTR Report**

### Generating Reports
1. After adding items, click **Generate MTR Report**
2. Review the professional report
3. **Print** or **Download** as HTML

### Searching Files
- Use the search box in Document Hub
- Filter by file type (Excel, PDF, Word)
- Search by filename or description

## 🔧 Features Explained

### Offline Support
- **Service Worker** caches all assets
- **LocalStorage** saves your data
- Works without internet connection
- Syncs when connection returns

### Auto-Generated Reports
- **MTR Numbers** created automatically (MTR-YYYYMMDD-####)
- **Professional Formatting** with timestamps
- **Easy Download** for record-keeping
- **Print-Friendly** layout

### Inventory Dashboard
- **Real-time Status** of materials
- **Quick Item Search** by ID or name
- **Stock Level Tracking**
- **Production Run Information**

## 💾 Data Storage

### LocalStorage
- **Documents** - Stored as Base64
- **MTR Requests** - Persistent across sessions
- **Application Cache** - Fast loading

## 🌐 Browser Compatibility

✅ Chrome/Chromium  
✅ Firefox  
✅ Safari  
✅ Edge  
✅ Mobile Browsers  

## 📱 PWA Installation

### Desktop
1. Click address bar info icon
2. Select "Install app"
3. App appears on desktop

### Mobile
1. Open in browser
2. Menu → "Add to Home Screen"
3. App available like native app

## 🔐 Security Notes

- Data stored locally in browser only
- No external API calls
- Works offline - no data transmission needed
- HTTPS recommended for production

## 📊 MTR Report Format

Generated reports include:
- Report Date & Time
- MTR Number (auto-generated)
- Item Details (Number, Description, Qty)
- Priority Levels
- Notes/Comments
- Total Item Count
- Download/Print Options

## 🛠️ Customization

### Add Your Company Logo
Edit `index.html` header section

### Change Colors
Modify color codes in `style.css`:
- Primary: `#667eea` (purple)
- Secondary: `#764ba2` (dark purple)

### Add More Categories
Edit the category select in MTR form

### Modify Inventory Items
Update mock data in `script.js` searchInventory function

## 📝 Keyboard Shortcuts

- `Tab` - Navigate between fields
- `Enter` - Submit forms
- `Ctrl/Cmd + P` - Print reports

## 🐛 Troubleshooting

### Files Not Saving
- Check browser storage isn't full
- Try clearing cache and reload
- Use different browser

### Offline Not Working
- First load requires internet
- Service Worker needs time to cache
- Check browser allows offline access

### Large Files Slow
- LocalStorage has size limits (~5-10MB)
- For larger files, use file sharing

## 📞 Support

For issues:
1. Check browser console (F12)
2. Clear cache and reload
3. Try incognito/private mode
4. Update browser to latest version

## 📄 License

Free to use and modify for your needs

## 🎉 Version

**v1.0** - Initial Release
- Document Hub
- BBW Production Dashboard
- MTR Form with Auto-Report Generation
- Offline Support (PWA)

---

**Made for BBW Production | Harikrishnan**  
**2026**
