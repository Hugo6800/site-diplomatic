'use client'

import { Editor } from '@tiptap/react'
import Button from './Button'
import Image from 'next/image'
import { useEffect, useState, useCallback, useRef } from 'react'

type Props = {
  editor: Editor | null
}

export default function EditorMenuBar({ editor }: Props) {
  // États pour les nœuds et marques
  // const [isH1Active, setIsH1Active] = useState(false);
  const [isH2Active, setIsH2Active] = useState(false);
  const [isParagraphActive, setIsParagraphActive] = useState(false);
  const [isBoldActive, setIsBoldActive] = useState(false);
  const [isItalicActive, setIsItalicActive] = useState(false);
  const [isUnderlineActive, setIsUnderlineActive] = useState(false);
  const [isLinkActive, setIsLinkActive] = useState(false);
  const [isBulletListActive, setIsBulletListActive] = useState(false);
  const [isOrderedListActive, setIsOrderedListActive] = useState(false);
  const [isBlockquoteActive, setIsBlockquoteActive] = useState(false);
  
  // États pour le dialogue de lien
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const linkInputRef = useRef<HTMLInputElement>(null);
  
  const updateAllStates = useCallback(() => {
    if (!editor) return;
    
    setTimeout(() => {
      // setIsH1Active(editor.isActive('heading', { level: 1 }));
      setIsH2Active(editor.isActive('heading', { level: 2 }));
      setIsParagraphActive(editor.isActive('paragraph'));
      setIsBoldActive(editor.isActive('bold'));
      setIsItalicActive(editor.isActive('italic'));
      setIsUnderlineActive(editor.isActive('underline'));
      setIsLinkActive(editor.isActive('link'));
      setIsBulletListActive(editor.isActive('bulletList'));
      setIsOrderedListActive(editor.isActive('orderedList'));
      setIsBlockquoteActive(editor.isActive('blockquote'));
    }, 0);
  }, [editor]);
  
  useEffect(() => {
    const handleUpdate = () => {
      if (!editor) return;
      updateAllStates();
    };

    if (editor) {
      handleUpdate();
      
      editor.on('selectionUpdate', handleUpdate);
      editor.on('update', handleUpdate);
      editor.on('focus', handleUpdate);
      editor.on('blur', handleUpdate);
      editor.on('transaction', handleUpdate);
      
      return () => {
        editor.off('selectionUpdate', handleUpdate);
        editor.off('update', handleUpdate);
        editor.off('focus', handleUpdate);
        editor.off('blur', handleUpdate);
        editor.off('transaction', handleUpdate);
      };
    }
  }, [editor, updateAllStates]);
  
  if (!editor) return null

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 rounded-full mb-4 bg-[#F3DEDE] dark:bg-[#433D3D] dark:border-[#575656]">
      <div className="flex gap-2 px-2 py-1 rounded-full border-2 border-[#433D3D] mr-3">
        {/* <Button
          type="button"
          variant={isH1Active ? 'primary' : 'secondary'}
          onClick={() => {
            editor.chain().setHeading({ level: 1 }).run();
            updateAllStates();
          }}
        >
          <Image
            src="/icons/TipTap/H1.svg"
            alt="h1"
            width={24}
            height={24}
            className="object-cover"
          />
        </Button> */}
        <Button
          type="button"
          variant={isH2Active ? 'primary' : 'secondary'}
          onClick={() => {
            editor.chain().setHeading({ level: 2 }).run();
            updateAllStates();
          }}
          title="Sous-titre"
        >
          <Image
            src="/icons/TipTap/H2.svg"
            alt="h2"
            width={24}
            height={24}
            className="object-cover"
          />
        </Button>
        <Button
          type="button"
          variant={isParagraphActive ? 'primary' : 'secondary'}
          onClick={() => {
            editor.chain().setParagraph().run();
            updateAllStates();
          }}
          title="Paragraphe"
        >
          <Image
            src="/icons/TipTap/Aa.svg"
            alt="paragraph"
            width={24}
            height={24}
            className="object-cover"
          />

        </Button>
      </div>
      <Button
        type="button"
        variant={isBoldActive ? 'primary' : 'secondary'}
        onClick={() => {
          editor.chain().toggleBold().run();
          updateAllStates();
        }}
        title="Gras"
      >
        <Image
          src="/icons/TipTap/bold.svg"
          alt="bold"
          width={24}
          height={24}
          className="object-cover"
        />
      </Button>
      <Button
        type="button"
        variant={isItalicActive ? 'primary' : 'secondary'}
        onClick={() => {
          editor.chain().toggleItalic().run();
          updateAllStates();
        }}
        title="Italique"
      >
        <Image
          src="/icons/TipTap/Italic.svg"
          alt="italic"
          width={24}
          height={24}
          className="object-cover"
        />
      </Button>
      <Button
        type="button"
        variant={isUnderlineActive ? 'primary' : 'secondary'}
        onClick={() => {
          editor.chain().toggleUnderline().run();
          updateAllStates();
        }}
        title="Souligné"
      >
        <Image
          src="/icons/TipTap/Underline.svg"
          alt="underline"
          width={24}
          height={24}
          className="object-cover"
        />
      </Button>
      <div className="flex justify-center items-center mx-3 relative">
        <Button
          type="button"
          variant={isLinkActive ? 'primary' : 'secondary'}
          onClick={() => {
            // Si un lien est déjà actif, le supprimer
            if (isLinkActive) {
              editor.chain().unsetLink().run();
              updateAllStates();
            } else {
              // Sinon, ouvrir le dialogue pour ajouter un lien
              const selection = editor.state.selection;
              // Vérifier si du texte est sélectionné
              if (!selection.empty) {
                setShowLinkDialog(true);
                // Focus sur l'input après l'affichage du dialogue
                setTimeout(() => {
                  linkInputRef.current?.focus();
                }, 0);
              } else {
                alert('Veuillez sélectionner du texte avant d\'insérer un lien');
              }
            }
          }}
          title={isLinkActive ? 'Supprimer le lien' : 'Insérer un lien'}
        >
          <Image
            src="/icons/TipTap/Link.svg"
            alt="link"
            width={24}
            height={24}
            className="object-cover"
          />
        </Button>
        
        {showLinkDialog && (
          <div className="absolute top-full left-0 mt-2 p-3 bg-white dark:bg-[#1E1E1E] border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-50 w-80">
            <div className="flex flex-col gap-2">
              <label htmlFor="linkUrl" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                URL du lien
              </label>
              <input
                ref={linkInputRef}
                type="url"
                id="linkUrl"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#DE595C] dark:bg-[#171414] dark:text-[#EECECE]"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => {
                    setShowLinkDialog(false);
                    setLinkUrl('');
                  }}
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    if (linkUrl) {
                      // Ajouter http:// si l'URL ne commence pas par http:// ou https://
                      let url = linkUrl;
                      if (!/^https?:\/\//i.test(url)) {
                        url = 'http://' + url;
                      }
                      
                      editor.chain().setLink({ href: url }).run();
                      setShowLinkDialog(false);
                      setLinkUrl('');
                      updateAllStates();
                    }
                  }}
                  className="px-3 py-1 text-sm bg-[#DE595C] text-white rounded-md hover:bg-[#DE595C]/90"
                >
                  Appliquer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Button
        type="button"
        variant={isBulletListActive ? 'primary' : 'secondary'}
        onClick={() => {
          editor.chain().toggleBulletList().run();
          updateAllStates();
        }}
        title="Liste à puces"
      >
        <Image
          src="/icons/TipTap/List_bulleted.svg"
          alt="bulletList"
          width={24}
          height={24}
          className="object-cover"
        />
      </Button>
      <Button
        type="button"
        variant={isOrderedListActive ? 'primary' : 'secondary'}
        onClick={() => {
          editor.chain().toggleOrderedList().run();
          updateAllStates();
        }}
        title="Liste numérotée"
      >
        <Image
          src="/icons/TipTap/List_number.svg"
          alt="orderedList"
          width={24}
          height={24}
          className="object-cover"
        />
      </Button>
      <div className="flex justify-center items-center mx-3">
        <Button
          type="button"
          variant={isBlockquoteActive ? 'primary' : 'secondary'}
          onClick={() => {
            editor.chain().toggleBlockquote().run();
            updateAllStates();
          }}
          title="Citation"
        >
          <Image
            src="/icons/TipTap/Quote.svg"
            alt="quote"
            width={24}
            height={24}
            className="object-cover"
          />
        </Button>
        <Button
          type="button"
          variant={'secondary'}
          onClick={() => {
            editor.chain().clearNodes().unsetAllMarks().run();
            updateAllStates();
          }}
          title="Supprimer le formatage"
        >
          <Image
            src="/icons/TipTap/Remove_styling.svg"
            alt="removeFormat"
            width={24}
            height={24}
            className="object-cover"
          />
        </Button>
      </div>
    </div>
  )
}
