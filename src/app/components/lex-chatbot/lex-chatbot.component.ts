import { Component } from '@angular/core';
import AWS from 'aws-sdk';

@Component({
  selector: 'app-lex-chatbot',
  templateUrl: './lex-chatbot.component.html',
  styleUrl: './lex-chatbot.component.css'
})
export class LexChatbotComponent {
  inputText: string = '';
  messages: { content: string | undefined, sender: string }[] = [];

  lexruntime: AWS.LexRuntime;

  constructor() {
    this.lexruntime = new AWS.LexRuntime({
      region: 'us-east-1',
      credentials: new AWS.Credentials({
        accessKeyId: '',
        secretAccessKey: '',
        sessionToken: ''
      })
    });
  }

  async sendMessage() {
    if (!this.inputText.trim()) return;

    const newMessages = [...this.messages, { content: this.inputText, sender: 'user' }];
    this.messages = newMessages;

    const params = {
      botAlias: 'restaurantexplorer',
      botName: 'RestaurantExplorer',
      inputText: this.inputText,
      userId: "1234567"
    };

    try {
      const response = await this.lexruntime.postText(params).promise();
      const botMessage = response.message;
      const newMessagesWithBot = [...newMessages, { content: botMessage, sender: 'bot' }];
      this.messages = newMessagesWithBot;
      this.inputText = '';
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}
