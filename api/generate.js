module.exports = (req, res) => {
  if (req.method === 'POST') {
    const { videoUrl } = req.body;
    // MVP Mock logic for Vercel Serverless
    setTimeout(() => {
      res.status(200).json({ 
        markdown: "# Generated SOP\n\n## Video: " + videoUrl + "\n\n1. Step One\n2. Step Two\n3. Final Step" 
      });
    }, 1000);
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
