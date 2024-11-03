'use client'
import { useState } from 'react'
import Image from 'next/image'
import styles from './page.module.css'
import { GoogleGenerativeAI } from '@google/generative-ai'
import Loader from '@/components/Loader'
import { FaGithub, FaYoutube, FaFacebook, FaMedium, FaWordpress, FaEnvelope, FaPhone, FaInstagram, FaCopy } from 'react-icons/fa';

// create ur api key here https://aistudio.google.com/app/apikey
const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const Home = () => {
  const [file, setFile] = useState(null)
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const genAI = new GoogleGenerativeAI(API_KEY)

  async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result.split(',')[1])
      reader.readAsDataURL(file)
    })
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type }
    }
  }

  const fetchDataProVision = async () => {
    if (!file || !prompt) {
      alert('Please select an image and write a prompt')
      return
    }
    setResponse(null)
    setLoading(true)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-8b' })

    try {
      const fileInputEl = document.querySelector('input[type=file]')
      const imageParts = await Promise.all(
        [...fileInputEl.files].map(fileToGenerativePart)
      )

      const result = await model.generateContent([prompt, ...imageParts])
      const response = await result.response
      const text = response.text()
      setLoading(false)
      setResponse(text)
      setPrompt('')
    } catch (error) {
      setError(`An error occurred: ${error}`)
      console.log(error)
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
    const reader = new FileReader()
    reader.onloadend = () => {
      setFile(reader.result)
    }
    if (file && allowedTypes.includes(file.type)) {
      reader.readAsDataURL(file)
    } else {
      alert('Please select a valid image file')
      event.target.value = null;
    }
  }

  const handlePromptChange = (event) => {
    setPrompt(event.target.value)
  }

  const getTitle = () => {
    return <h1 className={styles.main__title}>ArtLens AI Demo</h1>
  }

  const getImage = () => {
    if (!file) return null;
    
    return (
      <div className={styles.image__container}>
        <img
          src={file}
          alt="Uploaded image"
          className={styles.main__img}
          onLoad={(e) => {
            // Remove loading class once image is loaded
            e.target.classList.remove(styles.image__loading);
          }}
        />
      </div>
    );
  };

  const getInputFile = () => {
    return (
      <div className={styles.file__upload}>
        <input
          className={styles.main__inputFile}
          type='file'
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/jpg,image/webp"
          aria-label='Upload image'
        />
        <span className={styles.upload__icon}>📁</span>
        <span className={styles.upload__text}>Upload Image</span>
      </div>
    )
  }

  const getInputPrompt = () => {
    return (
      <textarea
        rows='4'
        cols='50'
        className={styles.main__inputPrompt}
        type='text'
        value={prompt}
        onChange={handlePromptChange}
        placeholder='Enter a prompt. Example: What do you see in the image? Is it a man or woman? What clothes are they wearing? etc.'
      />
    )
  }

  const getButton = () => {
    if (loading) return null
    return (
      <button className={styles.main__btn} onClick={fetchDataProVision}>
        Generate
      </button>
    )
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        // Show a temporary success message
        const copyButton = document.querySelector('.copy__button');
        if (copyButton) {
          copyButton.classList.add(styles.copy__success);
          setTimeout(() => {
            copyButton.classList.remove(styles.copy__success);
          }, 2000);
        }
      })
      .catch(err => console.error('Failed to copy:', err));
  };

  const getResponse = () => {
    if (response === null) return null;
    if (response === '') {
      return (
        <div className={styles.response__empty}>
          <span className={styles.response__icon}>ℹ️</span>
          <p>Please provide an image and prompt for ArtLens AI to analyze</p>
        </div>
      );
    }
    
    return (
      <div className={styles.response__container}>
        <div className={styles.response__header}>
          <div className={styles.response__title}>
            <span className={styles.response__icon}>✨</span>
            <h2>ArtLens Analysis</h2>
          </div>
          <button 
            className={`${styles.copy__button} copy__button`}
            onClick={() => copyToClipboard(response)}
            title="Copy to clipboard"
          >
            <FaCopy /> <span>Copy</span>
          </button>
        </div>
        <div className={styles.response__content}>
          {response.split('\n').map((paragraph, index) => (
            <p key={index} className={styles.response__paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    );
  };

  const getLoader = () => {
    if (!loading) return null
    return (
      <div className={styles.loader__container}>
        <div className={styles.loader}></div>
        <p className={styles.loader__text}>ArtLens AI is analyzing your image...</p>
      </div>
    )
  }

  const getError = () => {
    if (error) return <p className={styles.main__error}>Error: {error}</p>
  }

  const Footer = () => {
    return (
      <footer className={styles.footer}>
        <div className={styles.footer__content}>
          {/* Brand Section */}
          <div className={styles.footer__brand}>
            <span className={styles.copyright__icon}>⚡</span>
            <h3 className={styles.copyright__text}>Falahgs4AI</h3>
            <p className={styles.footer__tagline}>AI & Machine Learning Developer</p>
          </div>

          {/* Contact Section */}
          <div className={styles.footer__section}>
            <h4>Contact</h4>
            <a href="mailto:falahgs07@gmail.com" className={styles.footer__link}>
              <FaEnvelope /> your.email@example.com
            </a>
            <a href="tel:+1234567890" className={styles.footer__link}>
              <FaPhone /> +123 456 7890
            </a>
          </div>

          {/* Social Links Section */}
          <div className={styles.footer__section}>
            <h4>Follow Me</h4>
            <div className={styles.footer__social}>
              <a 
                href="https://github.com/falahgs" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.social__link}
                title="GitHub"
              >
                <FaGithub />
              </a>
              <a 
                href="https://facebook.com/falahgs" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.social__link}
                title="Facebook"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://falahgs.medium.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.social__link}
                title="Medium"
              >
                <FaMedium />
              </a>
              <a 
                href="https://youtube.com/c/@FalahgsGate" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.social__link}
                title="YouTube"
              >
                <FaYoutube />
              </a>
              <a 
                href="https://iraqprogrammer.wordpress.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.social__link}
                title="WordPress Blog"
              >
                <FaWordpress />
              </a>
              <a 
                href="https://www.instagram.com/falah.g.saleih/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.social__link}
                title="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className={styles.footer__copyright}>
          <p>© 2024 Falahgs4AI. All rights reserved.</p>
        </div>
      </footer>
    );
  };

  const Header = () => {
    return (
      <div className={styles.header}>
        <h1 className={styles.header__title}>
          <span className={styles.header__title_art}>Art</span>
          <span className={styles.header__title_lens}>Lens</span>
          <span className={styles.header__title_ai}>AI</span>
        </h1>
        <p className={styles.header__subtitle}>Transform Your Vision Into Reality</p>
      </div>
    )
  }

  // Add this new Profile component
  const Profile = () => {
    return (
      <div className={styles.profile}>
        <div className={styles.profile__container}>
          <div className={styles.profile__image_wrapper}>
            <img 
              src="/falahgs.jpg" // Add your profile image to public folder
              alt="Falahgs4AI Profile"
              className={styles.profile__image}
            />
            <div className={styles.profile__status}></div>
          </div>
          <div className={styles.profile__info}>
            <h3 className={styles.profile__name}>Falahgs4AI</h3>
            <p className={styles.profile__title}>AI & Machine Learning Developer</p>
            <div className={styles.profile__stats}>
              <div className={styles.stat}>
                <span className={styles.stat__value}>500+</span>
                <span className={styles.stat__label}>Projects</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.stat__value}>10+</span>
                <span className={styles.stat__label}>Years Exp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Add this new component
  const Sidebar = () => {
    const examplePrompts = [
      "Describe the main subject and their clothing in detail",
      "What emotions or mood does this image convey?",
      "Analyze the composition and lighting of this image",
      "What are the dominant colors and patterns in this image?",
      "Describe the background and setting of this image"
    ]

    const handleExampleClick = (examplePrompt) => {
      setPrompt(examplePrompt)
    }

    return (
      <div className={styles.sidebar}>
        <Profile />
        <div className={styles.sidebar__section}>
          <h3>🎨 Welcome to ArtLens AI</h3>
          <ul className={styles.sidebar__list}>
            <li>Advanced image analysis powered by AI</li>
            <li>Get detailed descriptions of any image</li>
            <li>Perfect for artists and creators</li>
          </ul>
        </div>

        <div className={styles.sidebar__section}>
          <h3>📝 How to Use</h3>
          <ul className={styles.sidebar__list}>
            <li>1. Upload your image</li>
            <li>2. Write a descriptive prompt</li>
            <li>3. Let ArtLens AI analyze it</li>
          </ul>
        </div>

        <div className={styles.sidebar__section}>
          <h3>💡 Prompt Tips</h3>
          <ul className={styles.sidebar__list}>
            <li>Be specific in your questions</li>
            <li>Ask about details like colors, objects</li>
            <li>Include context you want to analyze</li>
          </ul>
        </div>

        <div className={styles.sidebar__section}>
          <h3>⭐ Example Prompts</h3>
          <div className={styles.sidebar__examples}>
            {examplePrompts.map((examplePrompt, index) => (
              <button
                key={index}
                className={styles.example__prompt}
                onClick={() => handleExampleClick(examplePrompt)}
                title="Click to use this prompt"
              >
                {examplePrompt}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.sidebar__section}>
          <h3>🎯 Features</h3>
          <ul className={styles.sidebar__list}>
            <li>Powered by ArtLens AI</li>
            <li>Fast image analysis</li>
            <li>Detailed AI descriptions</li>
            <li>Multiple image formats supported</li>
          </ul>
        </div>

        <div className={styles.sidebar__footer}>
          <p>Powered by ArtLens AI</p>
          <small>Created by Falahgs4AI</small>
        </div>
      </div>
    )
  }

  const getImageAndPrompt = () => {
    return (
      <div className={styles.input__container}>
        {/* Image Section */}
        <div className={styles.image__section}>
          {getImage()}
          {getInputFile()}
        </div>
        
        {/* Prompt Section */}
        <div className={styles.prompt__section}>
          <textarea
            rows='4'
            cols='50'
            className={styles.main__inputPrompt}
            type='text'
            value={prompt}
            onChange={handlePromptChange}
            placeholder='Enter a prompt. Example: What do you see in the image? Is it a man or woman? What clothes are they wearing? etc.'
          />
          {getButton()}
        </div>
      </div>
    )
  }

  return (
    <main className={styles.main}>
      <Sidebar />
      <div className={styles.content}>
        <Header />
        {getImageAndPrompt()}
        {getLoader()}
        {getResponse()}
        {getError()}
        <Footer />
      </div>
      
      {/* Mobile menu toggle */}
      <button 
        className={styles.menu__toggle}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>
    </main>
  )
}

export default Home
