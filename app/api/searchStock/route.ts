import { NextRequest, NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

export async function GET( request: NextRequest ) {

  const { searchParams } = new URL(request.url);
	const symbol = searchParams.get("symbol");

	try {

    const result = await yahooFinance.search(symbol!, { quotesCount: 10 });

    return NextResponse.json(result, { status: 200 });

	} catch (error: any) {

		if (error instanceof yahooFinance.errors.FailedYahooValidationError) {
			// See the validation docs for examples of how to handle this
			// error.result will be a partially validated / coerced result.
		} else if (error instanceof yahooFinance.errors.HTTPError) {
			// Probably you just want to log and skip these
			return NextResponse.json({ error: (`Skipping yf.quote("${symbol}"): [${error.name}] ${error.message}`) }, { status: 500 });
		} else {
			return NextResponse.json({ error: `Skipping yf.quote("${symbol}"): [${error.name}] ${error.message}` }, { status: 500 });
		}
	}

}

export async function POST(request: NextRequest) {
  const body = await request.json(); // Parse JSON body
  const name = body.name || 'Guest';

  return NextResponse.json({ message: `Hello, ${name} from POST request!` });
}