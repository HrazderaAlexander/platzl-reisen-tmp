import { STRAPI_URL } from './strapiClient';

export const dataTransformers = {
  // Get media URL
  getMediaUrl(media: any): string {
    console.log('=== GET MEDIA URL ===');
    console.log('Media input:', media);
    console.log('Media type:', typeof media);
    
    if (!media) return '';
    
    let url = '';
    
    // Direct URL
    if (typeof media === 'string') {
      url = media;
    }
    // Direct url property
    else if (media.url) {
      url = media.url;
    }
    // Strapi v4/v5 format: data.attributes.url
    else if (media.data?.attributes?.url) {
      url = media.data.attributes.url;
    }
    // Strapi format: attributes.url
    else if (media.attributes?.url) {
      url = media.attributes.url;
    }
    
    console.log('Extracted URL:', url);
    
    if (!url) return '';
    
    const finalUrl = url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
    console.log('Final URL:', finalUrl);
    
    return finalUrl;
  },

  // Convert rich text to HTML
  richTextToHtml(richText: any): string {
    console.log('=== RICH TEXT TO HTML DEBUG ===');
    console.log('Input richText:', richText);
    console.log('Type:', typeof richText);
    
    if (!richText) return '';
    
    // If it's already a string, process it as markdown
    if (typeof richText === 'string') {
      return this.markdownToHtml(richText);
    }
    
    // Handle Strapi rich text format
    if (Array.isArray(richText)) {
      console.log('Processing array of blocks:', richText.length);
      return richText.map(block => {
        console.log('Processing block:', block);
        
        if (block.type === 'paragraph' && block.children) {
          const content = block.children.map((child: any) => {
            let text = child.text || '';
            if (child.bold) text = `<strong>${text}</strong>`;
            if (child.italic) text = `<em>${text}</em>`;
            if (child.underline) text = `<u>${text}</u>`;
            if (child.strikethrough) text = `<s>${text}</s>`;
            if (child.code) text = `<code>${text}</code>`;
            return text;
          }).join('');
          return `<p>${content}</p>`;
        }
        
        if (block.type === 'heading' && block.children) {
          const level = block.level || 1;
          const content = block.children.map((child: any) => {
            let text = child.text || '';
            if (child.bold) text = `<strong>${text}</strong>`;
            if (child.italic) text = `<em>${text}</em>`;
            return text;
          }).join('');
          return `<h${level}>${content}</h${level}>`;
        }
        
        if (block.type === 'list' && block.children) {
          const items = block.children.map((item: any) => {
            const content = item.children?.map((child: any) => {
              let text = child.text || '';
              if (child.bold) text = `<strong>${text}</strong>`;
              if (child.italic) text = `<em>${text}</em>`;
              return text;
            }).join('') || '';
            return `<li>${content}</li>`;
          }).join('');
          return block.format === 'ordered' ? `<ol>${items}</ol>` : `<ul>${items}</ul>`;
        }
        
        if (block.type === 'quote' && block.children) {
          const content = block.children.map((child: any) => {
            let text = child.text || '';
            if (child.bold) text = `<strong>${text}</strong>`;
            if (child.italic) text = `<em>${text}</em>`;
            return text;
          }).join('');
          return `<blockquote>${content}</blockquote>`;
        }
        
        if (block.type === 'heading' && block.children) {
          const level = block.level || 1;
          const content = block.children.map((child: any) => {
            let text = child.text || '';
            if (child.bold) text = `<strong>${text}</strong>`;
            if (child.italic) text = `<em>${text}</em>`;
            return text;
          }).join('');
          return `<h${level}>${content}</h${level}>`;
        }
        
        if (block.type === 'list' && block.children) {
          const items = block.children.map((item: any) => {
            const content = item.children?.map((child: any) => {
              let text = child.text || '';
              if (child.bold) text = `<strong>${text}</strong>`;
              if (child.italic) text = `<em>${text}</em>`;
              return text;
            }).join('') || '';
            return `<li>${content}</li>`;
          }).join('');
          return block.format === 'ordered' ? `<ol>${items}</ol>` : `<ul>${items}</ul>`;
        }
        
        if (block.type === 'quote' && block.children) {
          const content = block.children.map((child: any) => {
            let text = child.text || '';
            if (child.bold) text = `<strong>${text}</strong>`;
            if (child.italic) text = `<em>${text}</em>`;
            return text;
          }).join('');
          return `<blockquote>${content}</blockquote>`;
        }
        
        if (block.type === 'code' && block.children) {
          const content = block.children.map((child: any) => child.text || '').join('');
          return `<pre><code>${content}</code></pre>`;
        }
        
        // Handle unknown block types
        console.log('Unknown block type:', block.type);
        // Fallback: treat as text and process as markdown
        if (block.children) {
          const text = block.children.map((child: any) => child.text || '').join('');
          return this.markdownToHtml(text);
        }
        return this.markdownToHtml(String(block));
      }).join('');
    }
    
    console.log('Fallback: converting to markdown');
    return this.markdownToHtml(String(richText));
  },

  // Convert rich text to plain text
  richTextToPlain(richText: any): string {
    if (!richText) return '';
    if (typeof richText === 'string') return richText;
    
    // Handle Strapi rich text format
    if (Array.isArray(richText)) {
      return richText.map(block => {
        if (block.type === 'paragraph' && block.children) {
          return block.children.map((child: any) => child.text || '').join('');
        }
        return '';
      }).join('\n');
    }
    
    return String(richText);
  },

  // Convert Markdown to HTML
  markdownToHtml(markdown: any): string {
    if (!markdown) return '';
    
    // Handle Strapi rich text format first
    if (Array.isArray(markdown)) {
      return markdown.map(block => {
        if (block.type === 'paragraph' && block.children) {
          const content = block.children.map((child: any) => {
            let text = child.text || '';
            if (child.bold) text = `<strong>${text}</strong>`;
            if (child.italic) text = `<em>${text}</em>`;
            return text;
          }).join('');
          return `<p>${content}</p>`;
        }
        if (block.type === 'heading' && block.children) {
          const level = block.level || 1;
          const content = block.children.map((child: any) => child.text || '').join('');
          return `<h${level}>${content}</h${level}>`;
        }
        if (block.type === 'list' && block.children) {
          const items = block.children.map((item: any) => {
            const content = item.children?.map((child: any) => child.text || '').join('') || '';
            return `<li>${content}</li>`;
          }).join('');
          return block.format === 'ordered' ? `<ol>${items}</ol>` : `<ul>${items}</ul>`;
        }
        return '';
      }).join('');
    }
    
    // Convert to string if not already
    let html = typeof markdown === 'string' ? markdown : String(markdown);
    
    console.log('=== MARKDOWN TO HTML DEBUG ===');
    console.log('Input markdown:', html);
    
    // Enhanced MARKDOWN PROCESSING
    
    // Step 1: Normalize line endings
    html = html.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    // Step 2: Handle headings (# ## ### etc.) - improved
    html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    
    // Step 3: Handle bold text - **Text:** and **Text** - improved
    html = html.replace(/\*\*([^*\n]+?):\*\*/g, '<strong>$1:</strong>');
    html = html.replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>');
    
    // Step 4: Handle italic text
    html = html.replace(/\*([^*\n]+?)\*/g, '<em>$1</em>');
    
    // Step 5: Handle links [text](url)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Step 6: Handle unordered lists (- or * at start of line) - improved
    const lines = html.split('\n');
    let inList = false;
    let inOrderedList = false;
    let processedLines: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const isUnorderedListItem = /^[\s]*[-*+]\s+(.+)$/.test(line);
      const isOrderedListItem = /^[\s]*\d+\.\s+(.+)$/.test(line);
      
      if (isUnorderedListItem) {
        if (inOrderedList) {
          processedLines.push('</ol>');
          inOrderedList = false;
        }
        if (!inList) {
          processedLines.push('<ul>');
          inList = true;
        }
        const content = line.replace(/^[\s]*[-*+]\s+/, '').trim();
        processedLines.push(`<li>${content}</li>`);
      } else if (isOrderedListItem) {
        if (inList) {
          processedLines.push('</ul>');
          inList = false;
        }
        if (!inOrderedList) {
          processedLines.push('<ol>');
          inOrderedList = true;
        }
        const content = line.replace(/^[\s]*\d+\.\s+/, '').trim();
        processedLines.push(`<li>${content}</li>`);
      } else {
        if (inList) {
          processedLines.push('</ul>');
          inList = false;
        }
        if (inOrderedList) {
          processedLines.push('</ol>');
          inOrderedList = false;
        }
        processedLines.push(line);
      }
    }
    
    // Close any open lists
    if (inList) {
      processedLines.push('</ul>');
    }
    if (inOrderedList) {
      processedLines.push('</ol>');
    }
    
    html = processedLines.join('\n');
    
    // Step 7: Handle blockquotes (> text)
    html = html.replace(/^>\s*(.+)$/gm, '<blockquote>$1</blockquote>');
    
    // Step 8: Handle code blocks (```code```)
    html = html.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');
    
    // Step 9: Handle inline code (`code`)
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Step 10: Convert line breaks to paragraphs (improved)
    const paragraphs = html.split(/\n\s*\n/);
    html = paragraphs.map(paragraph => {
      const trimmed = paragraph.trim();
      if (!trimmed) return '';
      
      // Don't wrap if already has HTML tags
      if (trimmed.match(/^<(h[1-6]|ul|ol|li|blockquote|pre|div)/)) {
        return trimmed;
      }
      
      // Convert single line breaks to <br> within paragraphs
      const withBreaks = trimmed.replace(/\n/g, '<br>');
      return `<p>${withBreaks}</p>`;
    }).filter(p => p.length > 0).join('');
    
    // Step 11: Clean up extra <br> tags and spacing
    html = html.replace(/(<br>\s*){3,}/g, '<br><br>');
    html = html.replace(/<br>\s*<\/ul>/g, '</ul>');
    html = html.replace(/<br>\s*<\/ol>/g, '</ol>');
    html = html.replace(/<ul>\s*<br>/g, '<ul>');
    html = html.replace(/<ol>\s*<br>/g, '<ol>');
    html = html.replace(/<br>\s*<li>/g, '<li>');
    html = html.replace(/<\/li>\s*<br>/g, '</li>');
    html = html.replace(/<br>\s*<h([1-6])>/g, '<h$1>');
    html = html.replace(/<\/h([1-6])>\s*<br>/g, '</h$1>');
    
    // Step 12: Final cleanup
    html = html.replace(/\s+/g, ' ').trim();
    
    console.log('Final HTML output:', html);
    
    return html;
  }
};