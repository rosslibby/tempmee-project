import { Prisma } from '@prisma/client'
import { prisma } from '@utils/db'
import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import BooksService from '@services/books'

const Books = new BooksService()

export const populateBooks = async (req: Request, res: Response) => {
  const books = [
    {
      "title": "HOLLY",
      "author": "Stephen King",
      "isbn": "1668016133",
      "price": 3450
    },
    {
      "title": "FOURTH WING",
      "author": "Rebecca Yarros",
      "isbn": "1649374046",
      "price": 2220
    },
    {
      "title": "PAYBACK IN DEATH",
      "author": "J.D. Robb",
      "isbn": "1250284090",
      "price": 3060
    },
    {
      "title": "TOM LAKE",
      "author": "Ann Patchett",
      "isbn": "006332752X",
      "price": 3213
    },
    {
      "title": "THE RIVER WE REMEMBER",
      "author": "William Kent Krueger",
      "isbn": "198217921X",
      "price": 2104
    },
    {
      "title": "LESSONS IN CHEMISTRY",
      "author": "Bonnie Garmus",
      "isbn": "038554734X",
      "price": 3387
    },
    {
      "title": "DEMON COPPERHEAD",
      "author": "Barbara Kingsolver",
      "isbn": "0063251922",
      "price": 1715
    },
    {
      "title": "THE FRAUD",
      "author": "Zadie Smith",
      "isbn": "0525558969",
      "price": 2356
    },
    {
      "title": "THE HEAVEN & EARTH GROCERY STORE",
      "author": "James McBride",
      "isbn": "0593422945",
      "price": 1462
    },
    {
      "title": "THE COVENANT OF WATER",
      "author": "Abraham Verghese",
      "isbn": "0802162177",
      "price": 1803
    },
    {
      "title": "TOM CLANCY: WEAPONS GRADE",
      "author": "Don Bentley",
      "isbn": "0593422813",
      "price": 2837
    },
    {
      "title": "THE LONGMIRE DEFENSE",
      "author": "Craig Johnson",
      "isbn": "0593297318",
      "price": 2643
    },
    {
      "title": "LOOK OUT FOR THE LITTLE GUY!",
      "author": "Scott Lang with Rob Kutner",
      "isbn": "1368090133",
      "price": 2151
    },
    {
      "title": "AMAZING GRACE ADAMS",
      "author": "Fran Littlewood",
      "isbn": "1250857015",
      "price": 3477
    },
    {
      "title": "THE BREAKAWAY",
      "author": "Jennifer Weiner",
      "isbn": "1668033429",
      "price": 2383
    },
    {
      "title": "\"I GIVE YOU MY BODY ...\"",
      "author": "Diana Gabaldon",
      "isbn": "0399178570",
      "price": 2142
    },
    {
      "title": "\"MOST BLESSED OF THE PATRIARCHS\"",
      "author": "Annette Gordon-Reed and Peter S Onuf",
      "isbn": "0871404427",
      "price": 1681
    },
    {
      "title": "\"YOU JUST NEED TO LOSE WEIGHT\"",
      "author": "Aubrey Gordon",
      "isbn": "0807006475",
      "price": 1613
    },
    {
      "title": "#ASKGARYVEE",
      "author": "Gary Vaynerchuk",
      "isbn": "0062273124",
      "price": 2792
    },
    {
      "title": "#GIRLBOSS",
      "author": "Sophia Amoruso",
      "isbn": "039916927X",
      "price": 3053
    },
    {
      "title": "#IMOMSOHARD",
      "author": "Kristin Hensley and Jen Smedley",
      "isbn": "006285769X",
      "price": 1411
    },
    {
      "title": "#NEVERAGAIN",
      "author": "David Hogg and Lauren Hogg",
      "isbn": "198480183X",
      "price": 1429
    },
    {
      "title": "$100 STARTUP",
      "author": "Chris Guillebeau",
      "isbn": "0307951529",
      "price": 2852
    },
    {
      "title": "'57, Chicago",
      "author": "Steve Monroe",
      "isbn": "0786867302",
      "price": 1513
    },
    {
      "title": "'ROCK OF AGES: ''ROLLING STONE'' HISTORY OF ROCK AND ROLL'",
      "author": "GEOFFREY STOKES, KEN TUCKER' 'ED WARD",
      "isbn": "0671630687",
      "price": 1774
    },
    {
      "title": "'THE HIGH ROAD TO CHINA: GEORGE BOGLE, THE PANCHEN LAMA AND THE FIRST BRITISH EXPEDITION TO TIBET'",
      "author": "KATE TELTSCHER",
      "isbn": "0374217009",
      "price": 3136
    },
    {
      "title": "'TIL DEATH",
      "author": "Sharon Sala",
      "isbn": "0778314278",
      "price": 1435
    },
    {
      "title": "'TIL DEATH DO US PART",
      "author": "Amanda Quick",
      "isbn": "069819361X",
      "price": 3193
    },
    {
      "title": "'Til Faith Do Us Part: How Interfaith Marriage is Transforming America",
      "author": "Naomi Schaefer Riley",
      "isbn": "0199873747",
      "price": 2213
    },
    {
      "title": "'TIS THE SEASON",
      "author": "Ron Carr",
      "isbn": "0778316645",
      "price": 1887
    },
    {
      "title": "(RE)BORN IN THE USA",
      "author": "Roger Bennett",
      "isbn": "0062958690",
      "price": 1514
    },
    {
      "title": "------, THAT'S DELICIOUS",
      "author": "Action Bronson with Rachel Wharton",
      "isbn": "1419726552",
      "price": 1728
    },
    {
      "title": "...and the Horse He Rode In On: The People V. Kenneth Starr",
      "author": "James Carville",
      "isbn": "0684857340",
      "price": 2218
    }
  ]

  for (const book of books) {
    await prisma.book.create({
      data: book,
    })
  }

  res.status(200).send('Books populated successfully!')
}

export const allBooks = async (req: Request, res: Response) => {
  try {
    const books = await Books.getAllBooks()

    res.status(200).json(books)
  } catch (err) {
    throw createHttpError.InternalServerError()
  }
}

export const bookById = async (req: Request, res: Response) => {
  try {
    const book = await Books.getBookById(req.params.id)

    res.status(200).json(book)
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2001') {
        throw createHttpError.NotFound(`Book not found for ID ${req.params.id}`)
      }
    } else {
      throw createHttpError.InternalServerError()
    }
  }
}
