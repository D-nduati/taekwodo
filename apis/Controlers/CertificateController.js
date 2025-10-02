const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const { query } = require("./db"); 

module.exports = {
  CreateCertificate : async (req, res) => {
    try {
      const { userId, certificateName, certificateType, awardedDate, expiryDate, issuedBy } = req.body;
  
      // Build filename and path
      const fileName = `certificate_${userId}_${Date.now()}.pdf`;
      const filePath = path.join(__dirname, "../certificates", fileName);
  
      // Ensure directory exists
      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }
  
      // Fetch user
      const userResult = await query("SELECT Username FROM Users WHERE UserId = ?", [userId]);
      const userName = userResult.length > 0 ? userResult[0].Username : "Unknown";
  
      // Generate PDF
      const doc = new PDFDocument({ 
        size: "A4", 
        margin: 50,
        layout: "landscape"
      });
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // Generate unique certificate ID for QR code
      const certificateId = `TKD-${Date.now().toString().slice(-6)}`;
      const verificationUrl = `https://yourdomain.com/verify/${certificateId}`;
  
      // Register premium fonts (make sure these font files exist in your assets folder)
      try {
        // You'll need to add these font files to your project
        doc.registerFont('PlayfairDisplay-Bold', path.join(__dirname, '../assets/fonts/PlayfairDisplay-Bold.ttf'));
        doc.registerFont('PlayfairDisplay-Regular', path.join(__dirname, '../assets/fonts/PlayfairDisplay-Regular.ttf'));
        doc.registerFont('CormorantGaramond-Medium', path.join(__dirname, '../assets/fonts/CormorantGaramond-Medium.ttf'));
      } catch (fontError) {
        console.log('Premium fonts not found, using fallback fonts');
        // Fallback to standard fonts
      }

      // Add paper texture background (ensure you have a paper texture image)
      const paperTexturePath = path.join(__dirname, "../assets/paper-texture.jpg");
      if (fs.existsSync(paperTexturePath)) {
        doc.image(paperTexturePath, 0, 0, { width: doc.page.width, height: doc.page.height, opacity: 0.1 });
      } else {
        // Fallback: subtle paper-like gradient
        const paperGradient = doc.linearGradient(0, 0, doc.page.width, doc.page.height);
        paperGradient.stop(0, "#fafafa")
                   .stop(1, "#f5f5f5");
        doc.rect(0, 0, doc.page.width, doc.page.height).fill(paperGradient);
      }
  
      // Metallic gold and silver color definitions
      const goldColor = "#d4af37";
      const goldLight = "#f4e4a1";
      const goldDark = "#b8941f";
      const silverColor = "#c0c0c0";
      const silverLight = "#e8e8e8";
      const silverDark = "#a0a0a0";
  
      // Ornamental border frame with metallic effect
      doc.rect(25, 25, doc.page.width - 50, doc.page.height - 50)
         .lineWidth(8)
         .stroke(goldDark);
      doc.rect(35, 35, doc.page.width - 70, doc.page.height - 70)
         .lineWidth(4)
         .stroke(goldColor);
      doc.rect(40, 40, doc.page.width - 80, doc.page.height - 80)
         .lineWidth(2)
         .stroke(goldLight);
  
      // Corner decorations with metallic effect
      const cornerSize = 45;
      doc.strokeColor(goldColor).lineWidth(3);
      
      // Fancy corner designs
      function drawFancyCorner(x, y, rotation) {
        doc.save();
        doc.translate(x, y);
        doc.rotate(rotation);
        
        // Corner flourish design
        doc.moveTo(0, 0).lineTo(cornerSize, 0)
           .moveTo(0, 0).lineTo(0, cornerSize)
           .moveTo(10, 10).lineTo(cornerSize-5, 5)
           .moveTo(10, 10).lineTo(5, cornerSize-5);
        
        doc.restore();
      }
      
      drawFancyCorner(40, 40, 0); // Top-left
      drawFancyCorner(doc.page.width - 40, 40, 90); // Top-right
      drawFancyCorner(40, doc.page.height - 40, -90); // Bottom-left
      drawFancyCorner(doc.page.width - 40, doc.page.height - 40, 180); // Bottom-right
      doc.stroke();
  
      // Subtle metallic watermark pattern
      doc.fillColor(goldLight).opacity(0.08);
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
          // Ornamental pattern instead of simple circles
          const x = 80 + i * 120;
          const y = 80 + j * 150;
          doc.moveTo(x, y).lineTo(x + 20, y).lineTo(x + 10, y + 15).fill();
        }
      }
      doc.opacity(1);
  
      // Main title with metallic gold effect
      const mainTitleY = 70;
      doc.fontSize(38)
         .fillColor(goldDark)
         .font('PlayfairDisplay-Bold' || 'Helvetica-Bold')
         .text("CERTIFICATE OF EXCELLENCE", doc.page.width / 2, mainTitleY - 2, { 
           align: "center",
           characterSpacing: 2
         });
      
      // Title shadow effect for depth
      doc.fontSize(38)
         .fillColor(goldLight)
         .text("CERTIFICATE OF EXCELLENCE", doc.page.width / 2, mainTitleY, { 
           align: "center",
           characterSpacing: 2
         });
  
      // Subtitle with elegant typography
      doc.fontSize(16)
         .fillColor("#5d4037")
         .font('CormorantGaramond-Medium' || 'Helvetica')
         .text("This Certificate is Proudly Bestowed Upon", doc.page.width / 2, 140, { 
           align: "center",
           characterSpacing: 1
         });
  
      // Recipient Name with metallic effect
      const nameY = 170;
      doc.fontSize(44)
         .fillColor(goldDark)
         .font('PlayfairDisplay-Bold' || 'Helvetica-Bold')
         .text(userName.toUpperCase(), doc.page.width / 2, nameY - 1, { 
           align: "center",
           characterSpacing: 1.2
         });
      
      doc.fontSize(44)
         .fillColor(goldColor)
         .text(userName.toUpperCase(), doc.page.width / 2, nameY, { 
           align: "center",
           characterSpacing: 1.2
         });
  
      // Achievement details
      doc.fontSize(18)
         .fillColor("#37474f")
         .font('CormorantGaramond-Medium' || 'Helvetica')
         .text("For demonstrating exceptional skill and dedication in the art of", doc.page.width / 2, 250, { align: "center" });
  
      // Certificate name with emphasis
      doc.fontSize(26)
         .fillColor(goldColor)
         .font('PlayfairDisplay-Bold' || 'Helvetica-Bold')
         .text(certificateName, doc.page.width / 2, 280, { align: "center" });
  
      doc.fontSize(16)
         .fillColor("#5d4037")
         .font('CormorantGaramond-Medium' || 'Helvetica')
         .text(`${certificateType}`, doc.page.width / 2, 310, { align: "center" });
  
      // Certificate ID with verification info
      doc.fontSize(12)
         .fillColor("#666")
         .font('Helvetica')
         .text(`Certificate ID: ${certificateId}`, 60, 360);
  
      // Dates section with elegant formatting
      const awarded = awardedDate ? new Date(awardedDate).toLocaleDateString('en-US', { 
        year: 'numeric', month: 'long', day: 'numeric' 
      }) : new Date().toLocaleDateString('en-US', { 
        year: 'numeric', month: 'long', day: 'numeric' 
      });
  
      doc.fontSize(14)
         .fillColor("#37474f")
         .font('CormorantGaramond-Medium' || 'Helvetica')
         .text(`Awarded on this ${new Date(awardedDate || new Date()).toLocaleDateString('en-US', { weekday: 'long' })} day of ${new Date(awardedDate || new Date()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`, 60, 400);
  
      if (expiryDate) {
        const expiry = new Date(expiryDate).toLocaleDateString('en-US', { 
          year: 'numeric', month: 'long', day: 'numeric' 
        });
        doc.fontSize(14)
           .fillColor("#37474f")
           .text(`Valid until: ${expiry}`, 60, 425);
      }
  
      // Signature area with premium layout
      const signatureY = doc.page.height - 130;
      
      // Left side: Issuing authority
      doc.fontSize(14)
         .fillColor("#000")
         .font('CormorantGaramond-Medium' || 'Helvetica')
         .text("Issued Under the Authority of", 100, signatureY, { width: 200, align: "center" });
      
      doc.fontSize(18)
         .fillColor(goldColor)
         .font('PlayfairDisplay-Bold' || 'Helvetica-Bold')
         .text(issuedBy, 100, signatureY + 25, { width: 200, align: "center" });
  
      // Signature line
      doc.moveTo(80, signatureY + 70)
         .lineTo(320, signatureY + 70)
         .strokeColor(goldColor)
         .lineWidth(1.5)
         .stroke();
      
      doc.fontSize(10)
         .fillColor("#666")
         .font('Helvetica')
         .text("Authorized Signature", 100, signatureY + 75, { width: 200, align: "center" });
  
      // Right side: Official seal with QR code
      const sealX = doc.page.width - 200;
      const sealY = signatureY - 30;
      
      // Draw elaborate seal
      doc.circle(sealX + 60, sealY + 60, 45)
         .strokeColor(goldColor)
         .lineWidth(3)
         .stroke();
      
      doc.circle(sealX + 60, sealY + 60, 40)
         .strokeColor(goldDark)
         .lineWidth(1)
         .stroke();
      
      // Seal text in circular arrangement (simplified)
      doc.fontSize(8)
         .fillColor(goldDark)
         .font('Helvetica-Bold')
         .text("OFFICIAL SEAL", sealX + 25, sealY + 55, { width: 70, align: "center" });
      
      doc.fontSize(6)
         .fillColor("#666")
         .text("OF AUTHENTICITY", sealX + 25, sealY + 67, { width: 70, align: "center" });
  
      // Add high-quality vector logo if available
      const logoPath = path.join(__dirname, "../assets/logo.svg"); // Prefer SVG for vectors
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, sealX + 40, sealY + 45, { width: 40, height: 40 });
      } else {
        const logoPngPath = path.join(__dirname, "../assets/logo.png");
        if (fs.existsSync(logoPngPath)) {
          doc.image(logoPngPath, sealX + 40, sealY + 45, { width: 40, height: 40 });
        }
      }
  
      // QR Code for verification (you'll need to install 'qr-image' package: npm install qr-image)
      try {
        const qr = require('qr-image');
        const qrSvg = qr.imageSync(verificationUrl, { type: 'svg' });
        // For PNG version:
        const qrPng = qr.imageSync(verificationUrl, { type: 'png', size: 6 });
        const qrBuffer = Buffer.from(qrPng);
        
        doc.image(qrBuffer, sealX + 35, sealY + 95, { width: 50, height: 50 });
        
        doc.fontSize(6)
           .fillColor("#666")
           .font('Helvetica')
           .text("Scan to Verify", sealX + 30, sealY + 148, { width: 60, align: "center" });
      } catch (qrError) {
        console.log('QR code generation failed:', qrError.message);
        // Fallback: text verification info
        doc.fontSize(7)
           .fillColor("#666")
           .text(`Verify at: ${verificationUrl}`, sealX + 10, sealY + 100, { width: 100, align: "center" });
      }
  
      // Premium footer with verification message
      doc.fontSize(10)
         .fillColor(goldColor)
         .font('CormorantGaramond-Medium' || 'Helvetica')
         .text("This officially sealed certificate is digitally recorded and verifiable", 
               doc.page.width / 2, doc.page.height - 40, { align: "center" });
      
      doc.fontSize(8)
         .fillColor("#999")
         .text(`Document ID: ${certificateId} | Generated: ${new Date().toLocaleDateString()}`, 
               doc.page.width / 2, doc.page.height - 25, { align: "center" });
  
      doc.end();
  
      // Wait for file writing
      stream.on("finish", async () => {
        const sql = `
          INSERT INTO Certificates (UserId, CertificateName, CertificateType, AwardedDate, ExpiryDate, IssuedBy, FilePath, CertificateId, VerificationUrl)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
  
        // const result = await query(sql, [
        //   userId,
        //   certificateName,
        //   certificateType,
        //   awardedDate || new Date(),
        //   expiryDate || null,
        //   issuedBy,
        //   filePath,
        //   certificateId,
        //   verificationUrl
        // ]);
  
        res.status(201).json({
          message: "Premium certificate created successfully",
          certificateId: result.insertId,
          filePath,
          certificateNumber: certificateId,
          verificationUrl: verificationUrl
        });
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  // Download certificate by ID
  DownloadCertificate: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await query("SELECT FilePath FROM Certificates WHERE CertificateId = ?", [id]);

      if (result.length === 0) {
        return res.status(404).json({ message: "Certificate not found" });
      }

      const filePath = result[0].FilePath;
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "File not found on server" });
      }

      res.download(filePath);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
