const fs = require("fs");
const files = [
  "src/components/DashboardLayout.jsx",
  "src/components/DashboardLayout_collapsible.jsx",
  "src/components/LoginScreen.jsx",
  "src/components/VideoPlayer.jsx"
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, "utf8");
  
  // Eliminar data-sn-*="loquesea"
  content = content.replace(/\s*data-sn-[a-z]+="[^"]*"/g, "");
  
  // Eliminar clase focusable pura (en className="focusable" o combinada)
  content = content.replace(/\s+focusable\b/g, "");
  content = content.replace(/\bfocusable\s+/g, "");
  
  // Manejar el caso especial de className="focusable" quedando vacío
  content = content.replace(/className=""/g, "");
  content = content.replace(/className=''/g, "");
  
  // Eliminar llamadas a window.SpatialNavigation
  content = content.replace(/\s*if\s*\(\s*window\.SpatialNavigation\s*\)\s*\{[^}]*\}/g, "");
  content = content.replace(/\s*window\.SpatialNavigation\.[a-zA-Z]+\([^)]*\);?/g, "");

  fs.writeFileSync(file, content, "utf8");
  console.log("Limpiado:", file);
});
