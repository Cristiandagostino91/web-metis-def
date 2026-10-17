import os
import asyncio
import logging
import resend
from datetime import datetime
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logger = logging.getLogger(__name__)

# Initialize Resend
resend.api_key = os.environ.get("RESEND_API_KEY")
MERCHANT_EMAIL = os.environ.get("MERCHANT_EMAIL", "memoli.metis.pos@gmail.com")


def generate_order_email_html(order_data: dict) -> str:
    """Generate HTML email with complete order summary for courier/merchant"""
    
    items_html = ""
    for item in order_data.get("items", []):
        items_html += f"""
        <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">{item.get('name', 'Prodotto')}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">{item.get('quantity', 1)}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">€{item.get('price', 0):.2f}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">€{(item.get('price', 0) * item.get('quantity', 1)):.2f}</td>
        </tr>
        """
    
    customer = order_data.get("customer", {})
    shipping = order_data.get("shipping", {})
    
    subtotal = sum(item.get('price', 0) * item.get('quantity', 1) for item in order_data.get("items", []))
    shipping_cost = order_data.get("shippingCost", 8.90)
    total = order_data.get("total", subtotal + shipping_cost)
    
    order_date = datetime.now().strftime("%d/%m/%Y alle %H:%M")
    
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Nuovo Ordine - Centro Metis</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #16a34a, #15803d); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🛒 Nuovo Ordine</h1>
            <p style="color: #bbf7d0; margin: 10px 0 0 0;">Centro Metis - Studio Nutrizionale</p>
        </div>
        
        <!-- Order Info -->
        <div style="background: #f0fdf4; padding: 20px; border-left: 4px solid #16a34a;">
            <p style="margin: 0;"><strong>Ordine N°:</strong> {order_data.get('orderNumber', 'N/A')}</p>
            <p style="margin: 5px 0 0 0;"><strong>Data:</strong> {order_date}</p>
            <p style="margin: 5px 0 0 0;"><strong>Pagamento:</strong> PayPal ✅</p>
        </div>
        
        <!-- Customer Info -->
        <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; margin-top: 20px;">
            <h2 style="color: #16a34a; margin: 0 0 15px 0; font-size: 18px;">👤 Dati Cliente</h2>
            <table style="width: 100%;">
                <tr>
                    <td style="padding: 5px 0;"><strong>Nome:</strong></td>
                    <td>{customer.get('firstName', '')} {customer.get('lastName', '')}</td>
                </tr>
                <tr>
                    <td style="padding: 5px 0;"><strong>Email:</strong></td>
                    <td>{customer.get('email', '')}</td>
                </tr>
                <tr>
                    <td style="padding: 5px 0;"><strong>Telefono:</strong></td>
                    <td>{customer.get('phone', '')}</td>
                </tr>
            </table>
        </div>
        
        <!-- Shipping Address -->
        <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; margin-top: 20px;">
            <h2 style="color: #16a34a; margin: 0 0 15px 0; font-size: 18px;">📦 Indirizzo di Spedizione</h2>
            <p style="margin: 0; font-size: 16px;">
                <strong>{customer.get('firstName', '')} {customer.get('lastName', '')}</strong><br>
                {shipping.get('address', '')}<br>
                {shipping.get('zipCode', '')} {shipping.get('city', '')}<br>
                {f"<em>Note: {shipping.get('notes')}</em>" if shipping.get('notes') else ""}
            </p>
        </div>
        
        <!-- Order Items -->
        <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; margin-top: 20px;">
            <h2 style="color: #16a34a; margin: 0 0 15px 0; font-size: 18px;">📋 Riepilogo Prodotti</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #f3f4f6;">
                        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #16a34a;">Prodotto</th>
                        <th style="padding: 12px; text-align: center; border-bottom: 2px solid #16a34a;">Qtà</th>
                        <th style="padding: 12px; text-align: right; border-bottom: 2px solid #16a34a;">Prezzo</th>
                        <th style="padding: 12px; text-align: right; border-bottom: 2px solid #16a34a;">Totale</th>
                    </tr>
                </thead>
                <tbody>
                    {items_html}
                </tbody>
            </table>
        </div>
        
        <!-- Totals -->
        <div style="background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; margin-top: 20px;">
            <table style="width: 100%;">
                <tr>
                    <td style="padding: 8px 0;">Subtotale:</td>
                    <td style="text-align: right;">€{subtotal:.2f}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0;">Spedizione:</td>
                    <td style="text-align: right;">€{shipping_cost:.2f}</td>
                </tr>
                <tr style="border-top: 2px solid #16a34a;">
                    <td style="padding: 12px 0; font-size: 20px;"><strong>TOTALE:</strong></td>
                    <td style="text-align: right; font-size: 20px; color: #16a34a;"><strong>€{total:.2f}</strong></td>
                </tr>
            </table>
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
            <p>Questo ordine è stato effettuato su centrometis.com</p>
            <p>Centro Metis - Studio Nutrizionale<br>
            Via John Fitzgerald Kennedy, 66 - 84092 Bellizzi (SA)<br>
            Tel: +39 0828 52615</p>
        </div>
        
    </body>
    </html>
    """
    
    return html


async def send_order_notification(order_data: dict) -> dict:
    """Send order notification email to merchant"""
    
    if not resend.api_key:
        logger.error("RESEND_API_KEY not configured")
        return {"status": "error", "message": "Email service not configured"}
    
    try:
        html_content = generate_order_email_html(order_data)
        
        customer = order_data.get("customer", {})
        order_number = order_data.get("orderNumber", "N/A")
        
        params = {
            "from": "Centro Metis <onboarding@resend.dev>",
            "to": [MERCHANT_EMAIL],
            "subject": f"🛒 Nuovo Ordine #{order_number} - {customer.get('firstName', '')} {customer.get('lastName', '')}",
            "html": html_content
        }
        
        # Run sync SDK in thread to keep FastAPI non-blocking
        email = await asyncio.to_thread(resend.Emails.send, params)
        
        logger.info(f"Order notification email sent successfully to {MERCHANT_EMAIL}")
        return {
            "status": "success",
            "message": f"Email sent to {MERCHANT_EMAIL}",
            "email_id": email.get("id")
        }
        
    except Exception as e:
        logger.error(f"Failed to send order notification: {str(e)}")
        return {
            "status": "error",
            "message": str(e)
        }
