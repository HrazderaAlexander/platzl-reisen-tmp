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
    if (!richText) return '';
    if (typeof richText === 'string') return richText.replace(/\n/g, '<br>');
    
    // Handle Strapi rich text format
    if (Array.isArray(richText)) {
      return richText.map(block => {
        if (block.type === 'paragraph' && block.children) {
          const content = block.children.map((child: any) => {
            let text = child.text || '';
            if (child.bold) text = `<strong>${text}</strong>`;
            if (child.italic) text = `<em>${text}</em>`;
            return text;
          }).join('');
          return `<p>${content}</p>`;
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
    
    return String(richText).replace(/\n/g, '<br>');
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
    
    // REAL MARKDOWN PROCESSING for Strapi Markdown Editor
    
    // Step 1: Normalize line endings
    html = html.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    // Step 2: Handle headings (# ## ### etc.)
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    
    // Step 3: Handle bold text - **Text:** and **Text**
    html = html.replace(/\*\*([^*\n]+?):\*\*/g, '<strong>$1:</strong>');
    html = html.replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>');
    
    // Step 4: Handle italic text
    html = html.replace(/\*([^*\n]+?)\*/g, '<em>$1</em>');
    
    // Step 5: Handle unordered lists (- or * at start of line)
    const lines = html.split('\n');
    let inList = false;
    let processedLines: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const isListItem = /^[\s]*[-*+]\s+(.+)$/.test(line);
      
      if (isListItem) {
        if (!inList) {
          processedLines.push('<ul>');
          inList = true;
        }
        const content = line.replace(/^[\s]*[-*+]\s+/, '');
        processedLines.push(`<li>${content}</li>`);
      } else {
        if (inList) {
          processedLines.push('</ul>');
          inList = false;
        }
        processedLines.push(line);
      }
    }
    
    // Close any open list
    if (inList) {
      processedLines.push('</ul>');
    }
    
    html = processedLines.join('\n');
    
    // Step 6: Convert line breaks to <br> (but not inside lists)
    html = html.replace(/\n(?!<\/?(ul|li|h[1-6]))/g, '<br>');
    
    // Step 7: Clean up extra <br> tags
    html = html.replace(/(<br>\s*){3,}/g, '<br><br>');
    html = html.replace(/<br>\s*<\/ul>/g, '</ul>');
    html = html.replace(/<ul>\s*<br>/g, '<ul>');
    html = html.replace(/<br>\s*<li>/g, '<li>');
    html = html.replace(/<\/li>\s*<br>/g, '</li>');
    
    // Step 8: Wrap non-list, non-heading content in paragraphs
    const finalLines = html.split('<br>');
    const wrappedLines = finalLines.map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<ul>') || trimmed.startsWith('<h') || trimmed.startsWith('<li>') || trimmed.includes('</ul>')) {
        return trimmed;
      }
      return `<p>${trimmed}</p>`;
    });
    
    html = wrappedLines.filter(line => line.length > 0).join('');
    
    console.log('Final HTML output:', html);
    
    return html;
  }
};