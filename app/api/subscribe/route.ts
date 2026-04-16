import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

/**
 * API Route to handle Wellness Hub email subscriptions.
 * Persists user emails to a local JSON file for viewing.
 */
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Standard email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    // DISPOSABLE / JUNK DOMAINS BLOCKLIST
    const BANNED_DOMAINS = [
      'mailinator.com', 'tempmail.com', 'temp-mail.org', '10minutemail.com', 
      'trashmail.com', 'guerrillamail.com', 'guerrillamail.net', 'guerrillamail.org',
      'pokemail.net', 'spam4.me', 'dispostable.com', 'yopmail.com'
    ];

    const domain = email.split('@')[1].toLowerCase();
    
    // Block common junk domains
    if (BANNED_DOMAINS.includes(domain)) {
      return NextResponse.json({ error: 'Please use a professional or personal email address.' }, { status: 400 });
    }

    // Block obvious gibberish (e.g., jfnfn.com, wee.com)
    // Simple heuristic: repetitive consonants or suspicious patterns
    if (domain.length < 4 || /^[bcdfghjklmnpqrstvwxyz]+$/.test(domain.split('.')[0])) {
       return NextResponse.json({ error: 'Please use a legitimate email provider.' }, { status: 400 });
    }

    const dataDir = path.join(process.cwd(), 'data');
    const dataPath = path.join(dataDir, 'subscribers.json');

    // Ensure directory exists
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }

    let subscribers = [];
    
    // Read existing subscribers
    try {
      const fileContent = await fs.readFile(dataPath, 'utf8');
      subscribers = JSON.parse(fileContent);
    } catch {
      // If file doesn't exist, we start with an empty array
    }

    // Add new subscriber
    subscribers.push({
      email,
      date: new Date().toISOString(),
      source: 'Wellness Hub Sidebar'
    });

    // Write back to file
    await fs.writeFile(dataPath, JSON.stringify(subscribers, null, 2), 'utf8');

    return NextResponse.json({ success: true, message: 'Subscription saved successfully' });
  } catch (error) {
    console.error('Subscription Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
